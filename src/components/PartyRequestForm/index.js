import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import Global from 'constants/Global';
import checkoutModel from 'models/checkoutModel';
import { PENDING, FULFILLED, REJECTED } from 'constants/Status';
import { Image, Button, TextField, FormFlash, Dropdown } from 'components/base';
import moment from 'moment-timezone';
import marked from 'marked';
import DayPicker from 'react-day-picker';
import Raven from 'raven-js';
import 'react-day-picker/lib/style.css';

import {
  partyAttrs,
  defaultPartyTypes,
  defaultTimeSlots
} from 'constants/defaultPartyRequestForm';

import PartyRequestFormModal from './PartyRequestFormModal';

import cx from 'classnames';
import styles from './PartyRequestForm.scss';

const {
  LOCATION,
  DATE,
  TIME_SLOT,
  PARTY_TYPE,
  NO_OF_GUESTS,
  AGE,
  CELEBRATING,
  ALLERGIES,
  ADDONS
} = partyAttrs;

class PartyRequestForm extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.medium.label,
    selectedLocation: '',
    selectedDate: '',
    partyTypes: defaultPartyTypes,
    partyTypeIsSelected: false,
    selectedTimeSlot: '',
    selectedPartyType: '',
    selectedAge: '',
    selectedNumberOfGuests: '',
    selectedCelebrating: '',
    selectedAddOns: [],
    selectedAllergies: '',
    dayPickerIsSelected: false,
    moreInfoModalIsOpen: false,
    participantsLimit: 55,
    participantsLimitText: '',
    moreInfoOpenedPartyAddons: '',
    error: ''
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.addLineItemsStatus === PENDING &&
      this.props.addLineItemsStatus === FULFILLED
    ) {
      this.setState({ error: '' });
    }
  }

  updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.lowerbound ? small.label : medium.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  validateForm = () => {
    const {
      selectedLocation,
      selectedDate,
      selectedTimeSlot,
      selectedPartyType,
      selectedNumberOfGuests,
      selectedCelebrating
    } = this.state;

    if (!selectedLocation) {
      return false;
    }

    if (!selectedDate) {
      return false;
    }

    if (!selectedTimeSlot) {
      return false;
    }

    if (!selectedPartyType) {
      return false;
    }

    if (!selectedNumberOfGuests) {
      return false;
    }

    if (!selectedCelebrating) {
      return false;
    }

    return true;
  };

  formHasErrors = () => {
    const { selectedNumberOfGuests, participantsLimit } = this.state;

    if (selectedNumberOfGuests > participantsLimit) {
      const error = `Please enter total number of expected guests under ${participantsLimit}.`;
      this.setState({ error });
      return true;
    }

    this.setState({ error: '' });
    return false;
  };

  getButtonWidth = buttonCount => {
    const { small } = Global.breakpoints;

    if (this.state.currentBreakpoint === small.label) {
      return '50%';
    }

    if (buttonCount > 4) {
      return '25%';
    }

    return `${100 / buttonCount}%`;
  };

  getSelectedButton = (selectedValue, buttonValue) => {
    if (selectedValue === buttonValue) {
      return 'square--selected';
    }

    return 'square';
  };

  hasAllergies = () => {
    const { selectedAllergies } = this.state;

    return selectedAllergies
      ? `Allergies: ${selectedAllergies}`
      : 'No Allergies';
  };

  handleAddOnClick = value => {
    let addOns = this.state.selectedAddOns;
    const valueIndexInAddOns = addOns.indexOf(value);

    if (valueIndexInAddOns !== -1) {
      addOns.splice(valueIndexInAddOns, 1);
      this.setState({ selectedAddOns: addOns });
    } else {
      addOns = addOns.concat([value]);
      this.setState({ selectedAddOns: addOns });
    }
  };

  getPartySummary = () => {
    const {
      selectedLocation,
      selectedDate,
      selectedTimeSlot,
      selectedPartyType,
      selectedAge,
      selectedNumberOfGuests,
      selectedCelebrating
    } = this.state;
    const locations = get(this, 'props.partyAvailableLocations', {});

    return [
      {
        key: LOCATION,
        value: get(locations[selectedLocation], 'title', '')
      },
      {
        key: DATE,
        value: selectedDate
      },
      {
        key: TIME_SLOT,
        value: selectedTimeSlot
      },
      {
        key: PARTY_TYPE,
        value: selectedPartyType
      },
      {
        key: NO_OF_GUESTS,
        value: selectedNumberOfGuests
      },
      {
        key: AGE,
        value: selectedAge
      },
      {
        key: CELEBRATING,
        value: selectedCelebrating
      }
    ];
  };

  availabilityDataForSelectedLocation = () => {
    const locations = get(this, 'props.partyAvailableLocations', {});
    const { availabilities } = this.props;
    const { selectedLocation } = this.state;
    return selectedLocation
      ? availabilities[locations[selectedLocation].timekitProjectId]
      : null;
  };

  locationAvailabilitiesForSelectedDate = () => {
    const { selectedDate } = this.state;
    if (!selectedDate) return defaultTimeSlots;
    return (this.availabilityDataForSelectedLocation() || [])
      .filter(avail => {
        return avail.startMoment.format('MMMM DD, YYYY') === selectedDate;
      })
      .map((avail, index) => {
        return {
          uuid: index,
          index,
          timekitAvailability: avail,
          label: `${avail.startMoment.format('ha')} to ${avail.endMoment.format(
            'ha'
          )}`
        };
      });
  };

  makeStringifiedTimekitRequestObject = partyAttributes => {
    const { selectedTimeSlot } = this.state;
    const selectedAvailability = this.locationAvailabilitiesForSelectedDate().find(
      ({ label }) => label === selectedTimeSlot
    );

    if (!selectedAvailability) {
      // This is theoretically impossible. A user should not be
      // be able to call this method without selecting a valid
      // timeslot that has been derived from real Timekit data.
      Raven.captureMessage('PartyRequestForm: Impossible State Reached', {
        level: 'warning',
        extra: {
          selectedLocationId: get(this, 'state.selectedLocation'),
          selectedTimeSlot
        }
      });
      return '';
    }

    const {
      timekitAvailability: { start, end, resources }
    } = selectedAvailability;

    const attrs = partyAttributes.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    return JSON.stringify({
      resource_id: resources[0].id,
      graph: 'instant',
      start,
      end,
      what: `${attrs[PARTY_TYPE]}`,
      where: `${attrs[LOCATION]}`,
      description: `${attrs[NO_OF_GUESTS]} guests, ${
        attrs[AGE]
      }, celebrating: ${attrs[CELEBRATING]}. Allergies: ${
        attrs[ALLERGIES]
      }, Addons: ${attrs[ADDONS]}`
    });
  };

  handleMakeDeposit = () => {
    const errorCheck = this.formHasErrors();
    const { selectedAddOns, selectedAllergies } = this.state;

    if (!errorCheck) {
      const partyAttributes = this.getPartySummary().concat([
        { key: ALLERGIES, value: selectedAllergies },
        {
          key: ADDONS,
          value: selectedAddOns.join(', ')
        }
      ]);
      const items = [
        {
          variantId: get(this, 'props.partyDeposit.id', ''),
          quantity: 1,
          customAttributes: partyAttributes.concat([
            {
              key: '__TIMEKIT_REQUEST_DATA__',
              value: this.makeStringifiedTimekitRequestObject(partyAttributes)
            }
          ])
        }
      ];

      this.props.actions.addLineItems(this.props.checkout.id, items);
    }

    return errorCheck;
  };

  handleLocationChange = filter => {
    const locations = get(this, 'props.partyAvailableLocations', {});
    const { selectedLocation } = this.state;

    /* Fire off a request for the availability from Timekit here! */
    this.props.getAvailability(locations[filter.value].timekitProjectId);

    const partyTypes = locations[filter.value].partyTypes;
    const participantsLimit = locations[filter.value].participantsLimit;
    const participantsLimitText = locations[filter.value].participantsLimitText;

    this.setState({
      selectedLocation: filter.value,
      partyTypes: partyTypes.length ? partyTypes : defaultPartyTypes,
      participantsLimit,
      participantsLimitText
    });

    if (filter.value !== selectedLocation) {
      this.setState({
        selectedTimeSlot: '',
        selectedPartyType: '',
        selectedNumberOfGuests: ''
      });
    }
  };

  handleInnerButtonClick = (e, onClickFunction) => {
    e.stopPropagation();
    return onClickFunction;
  };

  render() {
    const formIsValid = this.validateForm();
    const {
      partyAddOns,
      partyDeposit,
      addLineItemsStatus,
      disabledDays,
      getAvailabilityStatus
    } = this.props;
    const {
      selectedLocation,
      selectedAddOns,
      selectedAllergies,
      selectedDate,
      selectedTimeSlot,
      selectedPartyType,
      selectedAge,
      selectedNumberOfGuests,
      selectedCelebrating,
      error,
      dayPickerIsSelected,
      participantsLimit,
      participantsLimitText
    } = this.state;

    const locations = get(this, 'props.partyAvailableLocations', {});
    const locationIds = Object.keys(locations);
    const ageGroups = [
      '2 to 5 years old',
      '4 to 6 years old',
      '7 to 10 years old',
      '11 to 13 years old',
      '14 to 18 years old',
      'Over 18'
    ];
    const fieldIsEmpty =
      !selectedLocation &&
      !selectedAddOns.length &&
      !selectedAllergies &&
      !selectedDate &&
      !selectedTimeSlot &&
      !selectedPartyType &&
      !selectedAge &&
      !selectedNumberOfGuests &&
      !selectedCelebrating;

    const availabilityDataForSelectedLocation = this.availabilityDataForSelectedLocation();
    const availabilityConsideredLoading = availabilityDataForSelectedLocation
      ? false
      : getAvailabilityStatus === PENDING;
    const availabilityDidError = getAvailabilityStatus === REJECTED;
    const disabledDaysForSelectedLocation = selectedLocation
      ? disabledDays[locations[selectedLocation].timekitProjectId] || []
      : [];

    const availsForSelectedDate = this.locationAvailabilitiesForSelectedDate();

    return (
      <div className="w100 flex flex-column items-center">
        <div className="w100 flex flex-column items-center px2">
          <h2 className="block-headline center my4">Party Request Form</h2>
          <div className="w100 mt4 flex flex-column items-center">
            <p className="bold big center mb3">
              Where would you like to host your party?
            </p>
            <Button
              variant="primary-small"
              color="peach"
              label="More Info"
              className={cx(
                styles['PartyRequestForm__more-info-button'],
                'uppercase mb3 tout'
              )}
              onClick={() => this.setState({ moreInfoModalIsOpen: true })}
            />
            <Dropdown
              className="w100 text-container-width z-sub-nav"
              color="peach"
              variant={selectedLocation ? 'square--selected' : 'square'}
              placeholder="Choose a Location"
              value={selectedLocation}
              onChange={filter => this.handleLocationChange(filter)}
              options={locationIds.reduce(
                (locationsWithTimekitProjectId, locationId) => {
                  if (!locations[locationId].timekitProjectId)
                    return locationsWithTimekitProjectId;
                  const title = locations[locationId].title;
                  return locationsWithTimekitProjectId.concat({
                    label: title,
                    value: locationId
                  });
                },
                []
              )}
            />
          </div>

          {availabilityConsideredLoading && (
            <span className="my2 text-white text-peach">
              {`We're loading availabilities for this location...`}
            </span>
          )}
          {availabilityDidError && (
            <span className="my2 text-white text-peach">
              {`Something's not working. Please reload and try again, or send us an email!`}
            </span>
          )}

          <div
            className={cx('w100 mt4 flex flex-column items-center', {
              [styles[
                'PartyRequestForm__section-disabled'
              ]]: !availabilityDataForSelectedLocation
            })}
          >
            <p className="bold big center">Do you have a weekend in mind?</p>
            <span
              className={cx('my2 text-white', {
                'text-peach': !availabilityDataForSelectedLocation
              })}
            >
              You must first select a location
            </span>
            <Button
              variant="style-none"
              onClick={() =>
                this.setState({
                  dayPickerIsSelected: !this.state.dayPickerIsSelected
                })
              }
              className={cx(
                styles['PartyRequestForm__day-picker-container'],
                'w100 text-container-width relative z-1',
                {
                  [styles[
                    'PartyRequestForm__day-picker-container--selected'
                  ]]: selectedDate
                }
              )}
            >
              {selectedDate ? (
                <p className="bold text-madison-blue">{selectedDate}</p>
              ) : (
                <p className="bold text-dusty-gray">Choose a day</p>
              )}
              <Image
                className={cx(
                  styles['PartyRequestForm__day-picker-button'],
                  'right'
                )}
                src={
                  dayPickerIsSelected
                    ? '/assets/images/arrow-dropdown.svg'
                    : '/assets/images/arrow-dropdown-active.svg'
                }
              />
              <DayPicker
                disabledDays={disabledDaysForSelectedLocation.map(dt =>
                  dt.toDate()
                )}
                className={cx(
                  styles['PartyRequestForm__day-picker'],
                  'absolute t0 l0 mt4 bg-white text-madison-blue',
                  {
                    hide: !dayPickerIsSelected
                  }
                )}
                onMonthChange={() => {
                  this.setState({ dayPickerIsSelected: true });
                }}
                onDayClick={day => {
                  this.setState({
                    selectedDate: moment(day).format('MMMM DD, YYYY')
                  });
                }}
                initialMonth={this.props.today}
                fromMonth={this.props.today}
                toMonth={
                  disabledDaysForSelectedLocation.length
                    ? disabledDaysForSelectedLocation[
                        disabledDaysForSelectedLocation.length - 1
                      ].toDate()
                    : null
                }
              />
            </Button>
          </div>

          <div
            className={cx('w100 mt4 flex flex-column items-center', {
              [styles['PartyRequestForm__section-disabled']]: !selectedDate
            })}
          >
            <p className="bold big center">
              Of these time slots, which is your first choice?
            </p>
            <span
              className={cx('my2 text-white', {
                'text-peach': !selectedDate
              })}
            >
              You must first select a date
            </span>
            <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
              {availsForSelectedDate.map((timeSlot, index, avails) => {
                const { label } = timeSlot;
                return (
                  <div
                    key={timeSlot.uuid}
                    style={{ width: this.getButtonWidth(avails.length) }}
                    className={cx(
                      styles['PartyRequestForm__button-container'],
                      'p1'
                    )}
                  >
                    <Button
                      className="center wh100 white-space-normal"
                      variant={
                        selectedTimeSlot
                          ? this.getSelectedButton(selectedTimeSlot, label)
                          : 'square'
                      }
                      label={label}
                      onClick={() => this.setState({ selectedTimeSlot: label })}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={cx('w100 mt4 flex flex-column items-center', {
              [styles[
                'PartyRequestForm__section-disabled'
              ]]: !availabilityDataForSelectedLocation
            })}
          >
            <p className="bold big center">
              Which kind of party is best for you?
            </p>
            <span
              className={cx('my2 text-white', {
                'text-peach': !availabilityDataForSelectedLocation
              })}
            >
              You must first select a location
            </span>
            <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
              {this.state.partyTypes.map(partyType => {
                const label = partyType.partyType;

                return (
                  <div key={partyType.uuid} className="p1 col-6 ">
                    <Button
                      className="wh100"
                      variant={
                        selectedPartyType
                          ? this.getSelectedButton(selectedPartyType, label)
                          : 'square'
                      }
                      onClick={() =>
                        this.setState({ selectedPartyType: label })
                      }
                    >
                      <div
                        className={cx(
                          'wh100 flex items-center mx2',
                          styles['PartyRequestForm__party-type-button']
                        )}
                      >
                        <p className="white-space-normal">{label}</p>
                        <div
                          className={cx(
                            styles[
                              'PartyRequestForm__party-type-inner-button-container'
                            ]
                          )}
                        >
                          <Button
                            variant="primary-small"
                            label="More Info"
                            color="peach"
                            className={cx(
                              styles[
                                'PartyRequestForm__party-type-inner-button'
                              ],
                              'uppercase tout white-space-normal'
                            )}
                            onClick={e => this.handleInnerButtonClick(e)}
                            to={partyType.link}
                            newTab={true}
                          />
                        </div>
                      </div>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={cx('w100 mt4 flex flex-column items-center', {
              [styles[
                'PartyRequestForm__section-disabled'
              ]]: !availabilityDataForSelectedLocation
            })}
          >
            <p className="bold big center mb2">
              How many participants are you expecting?
            </p>
            {!availabilityDataForSelectedLocation ? (
              <span className={cx('mb2 text-peach')}>
                You must first select a location
              </span>
            ) : null}
            {participantsLimitText ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(participantsLimitText)
                }}
                className={cx(
                  'center mb3 text-container-width',
                  styles['PartyRequestForm__help-text']
                )}
              />
            ) : (
              <p
                className={cx(
                  styles['PartyRequestForm__help-text'],
                  'center mb3 text-container-width'
                )}
              >
                {`Please note, the number of participants allowed at a party
                depends on each individual location's maximum occupancy.`}
              </p>
            )}
            <TextField
              className="w100 text-container-width"
              variant={selectedNumberOfGuests ? 'square--selected' : 'square'}
              placeholder="Enter number of guests"
              onChange={value =>
                this.setState({ selectedNumberOfGuests: value })
              }
              value={selectedNumberOfGuests}
              type="number"
              min={0}
              max={participantsLimit}
            />
          </div>

          <div className="w100 mt4 flex flex-column items-center">
            <p className="bold big center mb3">
              What is the age range of your party participants?
            </p>
            <div className="container-width w100 flex flex-row flex-wrap justify-center">
              {ageGroups.map(ageGroup => {
                return (
                  <div key={ageGroup} className="col-6 md-col-2 p1">
                    <Button
                      onClick={() => this.setState({ selectedAge: ageGroup })}
                      variant={
                        selectedAge
                          ? this.getSelectedButton(selectedAge, ageGroup)
                          : 'square'
                      }
                      className="center wh100 white-space-normal"
                      label={ageGroup}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w100 mt4 flex flex-column items-center">
            <p className="bold big center mb3">
              Who (or what) will we be celebrating?
            </p>
            <TextField
              className="w100 text-container-width"
              variant={selectedCelebrating ? 'square--selected' : 'square'}
              onChange={value => this.setState({ selectedCelebrating: value })}
              placeholder="Enter someone's name or a cause"
            />
          </div>
          {partyAddOns.length ? (
            <div className="w100 mt4 flex flex-column items-center">
              <p className="bold big center mb3">
                Would you like any Bells & Whistles?
              </p>
              <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
                {partyAddOns.map((partyAddOn, i) => {
                  const partyAddOnId = get(partyAddOn, 'id', '');

                  return (
                    <div key={partyAddOnId} className="col-6 p1">
                      <Button
                        onClick={() => this.handleAddOnClick(partyAddOn.title)}
                        className="center wh100 "
                        variant={
                          selectedAddOns.includes(partyAddOn.title)
                            ? 'square--selected'
                            : 'square'
                        }
                      >
                        <div className="flex flex-column wh100 my1">
                          <p className="mb1 white-space-normal center">
                            {partyAddOn.title}
                          </p>
                          <p className="light white-space-normal center">{`$${
                            partyAddOn.price
                          } ${partyAddOn.unit}`}</p>
                          <div
                            className={cx(
                              styles[
                                'PartyRequestForm__party-add-ons-inner-button--container'
                              ],
                              'mx-auto mt-auto mb0 pt2'
                            )}
                          >
                            <Button
                              variant="primary-small"
                              color="peach"
                              onClick={e =>
                                this.handleInnerButtonClick(
                                  e,
                                  this.setState({
                                    moreInfoOpenedPartyAddons: partyAddOnId
                                  })
                                )
                              }
                              className={cx(
                                styles[
                                  'PartyRequestForm__party-add-ons-inner-button'
                                ]
                              )}
                            >
                              <p className="uppercase tout white-space-normal">
                                More Info
                              </p>
                            </Button>
                          </div>
                        </div>
                      </Button>
                      {this.state.moreInfoOpenedPartyAddons === partyAddOnId ? (
                        <PartyRequestFormModal
                          onCloseClick={() =>
                            this.setState({ moreInfoOpenedPartyAddons: '' })
                          }
                          title={partyAddOn.title}
                        >
                          <p
                            className={cx(
                              styles['PartyRequestForm__modal__text'],
                              'mb1'
                            )}
                          >
                            {partyAddOn.moreInfoText}
                          </p>
                        </PartyRequestFormModal>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="w100 my4 flex flex-column items-center">
            <p className="bold big center mb3">
              Are there any dietary restrictions or allergies that we should be
              aware of?
            </p>
            <TextField
              className="w100 text-container-width"
              variant={selectedAllergies ? 'square--selected' : 'square'}
              onChange={value => this.setState({ selectedAllergies: value })}
              placeholder="Add a note"
            />
          </div>
          <div className="w100 text-container-width">
            {error.length ? (
              <FormFlash
                className="w100 mb2"
                error={true}
                message={
                  error
                    ? error
                    : 'There was an unexpected problem while submitting your request. Please reach out directly to parties@amplehills.com'
                }
              />
            ) : null}
            {!error.length && addLineItemsStatus === FULFILLED ? (
              <FormFlash
                className="w100 mb2"
                success={true}
                message="Your request is added to cart!"
              />
            ) : null}
          </div>
        </div>
        <div className="bg-pastel-peach w100 p4 mt4">
          <div
            className={cx(
              styles['PartyRequestForm__footer-container'],
              'flex container-width mx-auto'
            )}
          >
            <div
              className={cx(
                styles['PartyRequestForm__footer-summary'],
                'col-12 md-col-6 flex flex-column h100'
              )}
            >
              <div
                className={cx(
                  styles['PartyRequestForm__footer-text-container'],
                  'col12 md-col-10'
                )}
              >
                <p
                  className={cx(
                    styles[('PartyRequestForm__footer-text', 'bold')],
                    'mb3'
                  )}
                >
                  Summary
                </p>
                {fieldIsEmpty ? (
                  <p className={styles['PartyRequestForm__help-text']}>
                    Please make required selections
                  </p>
                ) : (
                  <div>
                    {this.getPartySummary().map(summaryField => {
                      const value = get(summaryField, 'value', '');
                      return value.length ? (
                        <p
                          key={summaryField.value}
                          className={styles['PartyRequestForm__help-text']}
                        >{`${summaryField.key}: ${summaryField.value}`}</p>
                      ) : null;
                    })}
                  </div>
                )}
                {!fieldIsEmpty ? (
                  <p className={styles['PartyRequestForm__help-text']}>
                    {this.hasAllergies()}
                  </p>
                ) : null}
                {selectedAddOns.length ? (
                  <div className="my1">
                    <p>Bells & Whistles:</p>
                    {selectedAddOns.map(addOn => (
                      <p
                        key={addOn}
                        className={styles['PartyRequestForm__help-text']}
                      >
                        {addOn}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col-12 md-col-4 flex h100">
              <div
                className={cx(
                  styles['PartyRequestForm__footer-text-container'],
                  'flex flex-column justify-between h100'
                )}
              >
                <p
                  className={cx(
                    styles['PartyRequestForm__footer-text'],
                    'bold mb3'
                  )}
                >
                  {`Deposit total $${partyDeposit.price}`}
                </p>
                <p className={cx(styles['PartyRequestForm__help-text'], 'mb3')}>
                  Thank you for partying with us! An Amployee will reach out to
                  you within two business days to get the party planning
                  started! Please note a $100.00 deposit and the signing of our
                  Party Contract is required to reserve your party.
                </p>
                <div>
                  <Button
                    disabled={!formIsValid}
                    onClick={() => this.handleMakeDeposit()}
                    color="madison-blue"
                    className={cx(
                      styles['PartyRequestForm__button'],
                      'inline-flex'
                    )}
                    label="Make Deposit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.moreInfoModalIsOpen ? (
          <PartyRequestFormModal
            title="More Info"
            onCloseClick={() => this.setState({ moreInfoModalIsOpen: false })}
          >
            {Object.values(locations).map(location => {
              return (
                <div key={location.id} className="my3 pr3">
                  <p className="bold mb1">{location.title}</p>
                  <p
                    className={cx(
                      styles['PartyRequestForm__modal__text'],
                      'mb1'
                    )}
                  >
                    {location.address1}
                  </p>
                  {location.address2 ? (
                    <p
                      className={cx(
                        styles['PartyRequestForm__modal__text'],
                        'mb1'
                      )}
                    >
                      {location.address2}
                    </p>
                  ) : null}
                  <p
                    className={cx(
                      styles['PartyRequestForm__modal__text'],
                      'mb1'
                    )}
                  >
                    {`${location.city}, ${location.state} ${location.zip}`}
                  </p>
                </div>
              );
            })}
          </PartyRequestFormModal>
        ) : null}
      </div>
    );
  }
}

PartyRequestForm.propTypes = {
  actions: PropTypes.shape({
    addLineItems: PropTypes.func
  }),
  checkout: checkoutModel.propTypes,
  partyAddOns: PropTypes.array,
  partyAvailableLocations: PropTypes.object,
  partyDeposit: PropTypes.shape({
    available: PropTypes.bool,
    description: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    price: PropTypes.string,
    title: PropTypes.string
  }),
  today: PropTypes.instanceOf(Date)
};

PartyRequestForm.defaultProps = {
  actions: {
    addLineItems: () => {}
  },
  checkout: checkoutModel.default,
  partyAddOns: [],
  partyAvailableLocations: {},
  partyDeposit: {
    available: false,
    description: '',
    handle: '',
    id: '',
    price: '0.00',
    title: ''
  },
  today: new Date(2019, 1, 1)
};

export default PartyRequestForm;

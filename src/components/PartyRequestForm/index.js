import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import Global from 'constants/Global';
import checkoutModel from 'models/checkoutModel';
import { PENDING, FULFILLED } from 'constants/Status';
import { Image, Button, TextField, FormFlash, Dropdown } from 'components/base';
import moment from 'moment';
import marked from 'marked';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
  defaultPartyTypes,
  defaultTimeSlots
} from 'constants/defaultPartyRequestForm';
import PartyRequestFormModal from './PartyRequestFormModal';

import cx from 'classnames';
import styles from './PartyRequestForm.scss';

class PartyRequestForm extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.medium.label,
    selectedLocation: '',
    selectedDate: '',
    timeSlots: defaultTimeSlots,
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
    moreInfoOpenedPartyAddons: ''
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
      this.setState({ error: false });
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

    this.setState({ error: false });
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
        key: 'Location',
        value: get(locations[selectedLocation], 'title', '')
      },
      {
        key: 'Date',
        value: selectedDate
      },
      {
        key: 'Time Slot',
        value: selectedTimeSlot
      },
      {
        key: 'Party Type',
        value: selectedPartyType
      },
      {
        key: '# of Guests',
        value: selectedNumberOfGuests
      },
      {
        key: 'Age',
        value: selectedAge
      },
      {
        key: 'Celebrating',
        value: selectedCelebrating
      }
    ];
  };

  handleMakeDeposit = () => {
    const errorCheck = this.formHasErrors();
    const { selectedAddOns, selectedAllergies } = this.state;

    if (!errorCheck) {
      const items = [
        {
          variantId: get(this, 'props.partyDeposit.id', ''),
          quantity: 1,
          customAttributes: this.getPartySummary().concat([
            { key: 'Allergies', value: selectedAllergies },
            {
              key: 'Party Addons',
              value: selectedAddOns.join(', ')
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

    const timeSlots = locations[filter.value].timeSlots;
    const partyTypes = locations[filter.value].partyTypes;
    const participantsLimit = locations[filter.value].participantsLimit;
    const participantsLimitText = locations[filter.value].participantsLimitText;

    this.setState({
      selectedLocation: filter.value,
      timeSlots: timeSlots.length ? timeSlots : defaultTimeSlots,
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
    const { partyAddOns, partyDeposit, addLineItemsStatus } = this.props;
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
      '2 - 5 Years old',
      '4 - 6 Years old',
      '7 - 10 Years old',
      '11 - 13 Years old',
      '14 + Years old'
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
              className="uppercase mb3 tout"
              onClick={() => this.setState({ moreInfoModalIsOpen: true })}
            />
            <Dropdown
              className="w100 text-container-width z-sub-nav"
              color="peach"
              variant={selectedLocation ? 'square--selected' : 'square'}
              placeholder="Choose a Location"
              value={selectedLocation}
              onChange={filter => this.handleLocationChange(filter)}
              options={locationIds.map(locationId => {
                const title = locations[locationId].title;

                return { label: title, value: locationId };
              })}
            />
          </div>
          <div className="w100 mt4 flex flex-column items-center">
            <p className="bold big center mb3">
              Do you have a weekend in mind?
            </p>
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
                onDayClick={day =>
                  this.setState({
                    selectedDate: moment(day).format('MMMM DD')
                  })
                }
                initialMonth={this.props.today}
              />
            </Button>
          </div>
          <div className="w100 mt4 flex flex-column items-center">
            <p className="bold big center mb3">
              Of these time slots, which is your first choice?
            </p>
            <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
              {this.state.timeSlots.map(timeSlot => {
                const timeSlotsLength = this.state.timeSlots.length;
                const label = `${timeSlot.startTime} to ${timeSlot.endTime}`;

                return (
                  <div
                    key={timeSlot.uuid}
                    style={{ width: this.getButtonWidth(timeSlotsLength) }}
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
          <div className="w100 mt4 flex flex-column items-center">
            <p className="bold big center mb3">
              Which kind of party is best for you?
            </p>
            <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
              {this.state.partyTypes.map(partyType => {
                const label = partyType.partyType;

                return (
                  <div key={partyType.uuid} className="p1 col-6">
                    <Button
                      className="center wh100 white-space-normal"
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
                          'w100 flex items-center mx2',
                          styles['PartyRequestForm__party-type-button']
                        )}
                      >
                        <p>{label}</p>
                        <Button
                          variant="primary-small"
                          color="peach"
                          label="More Info"
                          className={cx(
                            styles['PartyRequestForm__party-type-inner-button'],
                            'uppercase tout white-space-normal'
                          )}
                          onClick={e => this.handleInnerButtonClick(e)}
                          to={partyType.link}
                          newTab={true}
                        />
                      </div>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w100 mt4 flex flex-column items-center">
            <p className="bold big center mb2">
              How many participants are you expecting?
            </p>
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
                  'center mb3'
                )}
              >
                Maximum number of 55
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
              If relevant, what’s the age group of the children?
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
                        <div className="inline-flex flex-column w100 my2">
                          <p className="mb1 white-space-normal center">
                            {partyAddOn.title}
                          </p>
                          <p className="white-space-normal light">{`$${
                            partyAddOn.price
                          } ${partyAddOn.unit}`}</p>
                          <div className="mx-auto mt2">
                            <Button
                              variant="primary-small"
                              color="peach"
                              label="More Info"
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
                                  'PartyRequestForm__party-type-inner-button'
                                ],
                                'uppercase tout white-space-normal'
                              )}
                            />
                          </div>
                        </div>
                      </Button>
                      {this.state.moreInfoOpenedPartyAddons === partyAddOnId ? (
                        <PartyRequestFormModal
                          onCloseClick={() =>
                            this.setState({ moreInfoOpenedPartyAddons: '' })
                          }
                        >
                          <p className="m3 block-subheadline">
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
            {error ? (
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
            {error === false && addLineItemsStatus === FULFILLED ? (
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
                styles['PartyRequestForm__footer-summery'],
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
                  <p className={cx(styles['PartyRequestForm__help-text'])}>
                    Please make required selections
                  </p>
                ) : (
                  <div>
                    {this.getPartySummary().map(summeryField => {
                      const value = get(summeryField, 'value', '');
                      return value.length ? (
                        <p
                          key={summeryField.value}
                          className={cx(styles['PartyRequestForm__help-text'])}
                        >{`${summeryField.key}: ${summeryField.value}`}</p>
                      ) : null;
                    })}
                  </div>
                )}
                {selectedAddOns.length
                  ? selectedAddOns.map(addOn => {
                      return (
                        <p
                          key={addOn}
                          className={cx(styles['PartyRequestForm__help-text'])}
                        >{`Addon: ${addOn}`}</p>
                      );
                    })
                  : null}
                {!fieldIsEmpty ? (
                  <p className={cx(styles['PartyRequestForm__help-text'])}>
                    {this.hasAllergies()}
                  </p>
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
                  Statement that mentions what the customer can expect after
                  making this deposit
                </p>
                <div>
                  <Button
                    disabled={!formIsValid}
                    onClick={() => this.handleMakeDeposit()}
                    color="madison-blue"
                    className="inline-flex"
                    label="Make Deposit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.moreInfoModalIsOpen ? (
          <PartyRequestFormModal
            onCloseClick={() => this.setState({ moreInfoModalIsOpen: false })}
          >
            {Object.values(locations).map(location => {
              return (
                <div key={location.id} className="m3">
                  <p className="bold big mb2">{location.title}</p>
                  <p className="mb1">{location.address1}</p>
                  {location.address2 ? (
                    <p className="mb1">{location.address2}</p>
                  ) : null}
                  <p>{`${location.city}, ${location.state} ${location.zip}`}</p>
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

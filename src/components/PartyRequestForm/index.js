import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import Global from 'constants/Global';
import { PENDING, FULFILLED, REJECTED } from 'constants/Status';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import cx from 'classnames';
import styles from './PartyRequestForm.scss';
import {
  Image,
  Button,
  TextField,
  FormFlash,
  Dropdown,
  Modal
} from 'components/base';

class PartyRequestForm extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.medium.label,
    selectedLocation: '',
    selectedDate: '',
    timeSlots: [
      { uuid: '1', index: 0, endTime: '11am', startTime: '1pm' },
      { uuid: '2', index: 1, endTime: '4pm', startTime: '2pm' },
      { uuid: '3', index: 2, endTime: '7pm', startTime: '5pm' },
      { uuid: '4', index: 3, endTime: '10pm', startTime: '8pm' }
    ],
    partyTypes: [
      { uuid: '1', index: 0, partyType: 'Bike Party', link: '/bike-party' },
      {
        uuid: '2',
        index: 1,
        partyType: 'Scoop Tab Party',
        link: 'scoop-tab-party'
      }
    ],
    partyTypeIsSelected: false,
    selectedTimeSlot: '',
    selectedPartyType: '',
    selectedAge: '',
    selectedNumberOfGuests: 0,
    selectedCelebrating: '',
    selectedAddOns: [],
    selectedAllergies: '',
    dayPickerIsSelected: false,
    modalIsOpen: false
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.lowerbound ? small.label : medium.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  formHasErrors = () => {
    const {
      selectedLocation,
      selectedDate,
      selectedTimeSlot,
      selectedPartyType,
      selectedNumberOfGuests,
      selectedCelebrating
    } = this.state;

    if (!selectedLocation) {
      const error = 'Please select the location.';
      this.setState({ error });
      return true;
    }

    if (!selectedDate) {
      const error = 'Please select the date.';
      this.setState({ error });
      return true;
    }

    if (!selectedTimeSlot) {
      const error = 'Please select the time slot.';
      this.setState({ error });
      return true;
    }

    if (!selectedPartyType) {
      const error = 'Please select the party type.';
      this.setState({ error });
      return true;
    }

    if (!selectedNumberOfGuests || selectedNumberOfGuests > 55) {
      const error = 'Please enter total number of expected guests under 55.';
      this.setState({ error });
      return true;
    }

    if (!selectedCelebrating) {
      const error = 'Please enter who or what we will be celebrating.';
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

  hasSelectedAllergies = () => {
    const { selectedAllergies } = this.state;

    return selectedAllergies
      ? `Allergies: ${selectedAllergies}`
      : 'No Alergies';
  };

  addOnClick = value => {
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

  handleMakeDeposit = summeryOrder => {
    const errorCheck = this.formHasErrors();
    const attributes = summeryOrder.map(
      field => `${field.name}: ${field.value}`
    );

    const item = [
      {
        variantId: get(this, 'props.partyDeposit.id', ''),
        quantity: 1,
        customAttributes: [
          {
            key: 'Order Summery',
            value: attributes.join(', ')
          }
        ]
      }
    ];
    if (!errorCheck) {
      this.props.actions.addLineItems(this.props.checkout.id, item);
    }

    return errorCheck;
  };

  handleLocationChange = filter => {
    const locations = get(this, 'props.partyAvailableLocations', {});
    const { selectedLocation } = this.state;

    const timeSlots = locations[filter.value].timeSlots;
    const partyTypes = locations[filter.value].partyTypes;

    this.setState({
      selectedLocation: filter.value,
      timeSlots: timeSlots,
      partyTypes: partyTypes
    });

    filter.value !== selectedLocation
      ? this.setState({
          selectedTimeSlot: '',
          selectedPartyType: ''
        })
      : null;
  };

  render() {
    const { formStatus, partyAddons, partyDeposit } = this.props;
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
      dayPickerIsSelected
    } = this.state;
    const locations = get(this, 'props.partyAvailableLocations', {});
    const locationIds = Object.keys(locations);
    const ageGroups = ['2 - 5', '4 - 6', '7 -10', '11 - 13'];
    const partyAddonsValue = Object.values(partyAddons);
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

    const summeryOrder = [
      {
        name: 'Location',
        value: get(locations[selectedLocation], 'title', '')
      },
      {
        name: 'Date',
        value: selectedDate
      },
      {
        name: 'Time Slot',
        value: selectedTimeSlot
      },
      {
        name: 'Party Type',
        value: selectedPartyType
      },
      {
        name: '# of Guests',
        value: selectedNumberOfGuests
      },
      {
        name: 'Age',
        value: selectedAge
      },
      {
        name: 'Celebrating',
        value: selectedCelebrating
      }
    ];

    return (
      <div className="w100 flex flex-column items-center">
        <div className="w100 flex flex-column items-center px2">
          <h2 className="block-headline center my4">Party Request Form</h2>
          <div className="w100 mt4 flex flex-column items-center">
            <p className="bold big center mb3">
              At which location would you like to host your party?
            </p>
            <Button
              variant="primary-small"
              color="peach"
              label="More Info"
              className="uppercase mb3 tout"
              onClick={() => this.setState({ modalIsOpen: true })}
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
              Did you have a day in mind for your event?
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
                          to={partyType.link}
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
              How many total guests are you expecting?
            </p>
            <p
              className={cx(
                styles['PartyRequestForm__help-text'],
                'center mb3'
              )}
            >
              Maximum number of 55
            </p>
            <TextField
              className="w100 text-container-width"
              variant={selectedNumberOfGuests ? 'square--selected' : 'square'}
              placeholder="Enter number of guests"
              onChange={value =>
                this.setState({ selectedNumberOfGuests: value })
              }
              type="number"
            />
          </div>
          <div className="w100 mt4 flex flex-column items-center">
            <p className="bold big center mb3">
              If relevant, what’s the age group of the children?
            </p>
            <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
              {ageGroups.map(ageGroup => {
                return (
                  <div key={ageGroup} className="col-6 md-col-3 p1">
                    <Button
                      onClick={() => this.setState({ selectedAge: ageGroup })}
                      variant={
                        selectedAge
                          ? this.getSelectedButton(selectedAge, ageGroup)
                          : 'square'
                      }
                      className="center wh100 white-space-normal"
                      label={`${ageGroup} Years old`}
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
              placeholder="Enter a name of something"
            />
          </div>
          <div className="w100 mt4 flex flex-column items-center">
            <p className="bold big center mb3">Would you like any add-ons?</p>
            <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
              {partyAddonsValue.map(partyAddOn => {
                return (
                  <div key={partyAddOn.id} className="col-6 p1">
                    <Button
                      onClick={() => this.addOnClick(partyAddOn.handle)}
                      className="center wh100 "
                      variant={
                        selectedAddOns.includes(partyAddOn.handle)
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
                        } ${partyAddOn.description}`}</p>
                      </div>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
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
                    : 'There was an unexpected problem while submitting your request. Please reach out directly to info@amplehills.com'
                }
              />
            ) : null}
            {error === false ? (
              <FormFlash
                className="w100 mb2"
                success={true}
                message="Your request is added to cart!"
              />
            ) : null}
          </div>
        </div>
        <div className="bg-tuft-bush w100 p4 mt4">
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
                  styles['PartyRequestForm__footer-text-container']
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
                    {summeryOrder.map(summeryField => {
                      const value = get(summeryField, 'value', '');
                      if (value.length) {
                        return (
                          <p
                            key={summeryField.value}
                            className={cx(
                              styles['PartyRequestForm__help-text']
                            )}
                          >{`${summeryField.name}: ${summeryField.value}`}</p>
                        );
                      }
                    })}
                  </div>
                )}
                {selectedAddOns.length
                  ? selectedAddOns.map(addOn => {
                      return (
                        <p
                          key={addOn}
                          className={cx(styles['PartyRequestForm__help-text'])}
                        >{`Addon: ${partyAddons[addOn].title}`}</p>
                      );
                    })
                  : null}
                {!fieldIsEmpty ? (
                  <p className={cx(styles['PartyRequestForm__help-text'])}>
                    {this.hasSelectedAllergies()}
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
                    onClick={() => this.handleMakeDeposit(summeryOrder)}
                    color="madison-blue"
                    className="inline-flex"
                    label="Make Deposit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.modalIsOpen ? (
          <div
            className={cx(
              styles['PartyRequestForm__modal'],
              'overflow-scroll fixed-cover bg-white-wash flex justify-center items-center transition-fade-in'
            )}
          >
            <div
              className={cx(
                styles['PartyRequestForm__modal-content-container'],
                'relative flex items-center justify-center bg-white drop-shadow transition-slide-up-large-long'
              )}
            >
              <div className="wh100 m-auto flex flex-column mb3 justify-center">
                <div>
                  <h2 className="block-headline m3 pt3 mb3">More Info</h2>
                  {Object.values(locations).map(location => {
                    return (
                      <div key={location.id} className="m3">
                        <p className="bold big mb2">{location.title}</p>
                        <p>{location.address1}</p>
                        {location.address2 ? <p>{location.address2}</p> : null}
                        <p>{`${location.city}, ${location.state} ${
                          location.zip
                        }`}</p>
                        <p>capacity</p>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <Button
                    className={cx(
                      styles['PartyRequestForm__modal-close-button'],
                      'right'
                    )}
                    color="madison-blue"
                    label="Close"
                    onClick={() => this.setState({ modalIsOpen: false })}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

PartyRequestForm.propTypes = {};

PartyRequestForm.defaultProps = {};

export default PartyRequestForm;

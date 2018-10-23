import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import Global from 'constants/Global';
import { PENDING, FULFILLED, REJECTED } from 'constants/Status';

import cx from 'classnames';
import styles from './PartyRequestForm.scss';
import {
  Image,
  Button,
  TextField,
  FormFlash,
  Dropdown,
  Radio
} from 'components/base';

class PartyRequestForm extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.medium.label,
    selectedLocation: '',
    selecteddate: '',
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
    selectedAllergies: ''
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
      selectedAddOns,
      selectedAllergies,
      selectedDate,
      selectedTimeSlot,
      selectedPartyType,
      selectedAge,
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
      const error = 'Please enter expectiong total guests number under 55.';
      this.setState({ error });
      return true;
    }

    if (!selectedCelebrating) {
      const error = 'Please enter Who (or what) will we be celebrating.';
      this.setState({ error });
      return true;
    }

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

  handleMakeDeposit = () => {
    return this.formHasErrors();
  };

  render() {
    const { formStatus } = this.props;
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
      error
    } = this.state;
    const locations = get(this, 'props.partyAvailableLocations', {});
    const locationIds = Object.keys(locations);
    const ageGroups = ['2 - 5', '4 - 6', '7 -10', '11 - 13'];
    const partyAddOns = [
      { value: 'Our Food & Drink Package1', price: 60.0 },
      { value: 'Our Food & Drink Package2', price: 60.0 },
      { value: 'Our Food & Drink Package3', price: 60.0 }
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
          />
          <Dropdown
            className="w100 text-container-width z-sub-nav"
            color="peach"
            variant={selectedLocation ? 'square--selected' : 'square'}
            placeholder="Choose a Location"
            value={selectedLocation}
            onChange={filter => {
              this.setState({
                selectedLocation: filter.value,
                timeSlots: locations[filter.value].timeSlots,
                partyTypes: locations[filter.value].partyTypes
              }),
                filter.value !== selectedLocation
                  ? this.setState({
                      selectedTimeSlot: '',
                      selectedPartyType: ''
                    })
                  : null;
            }}
            options={locationIds.map(locationId => {
              const title = locations[locationId].title;

              return { label: title, value: locationId };
            })}
          />
        </div>
        <div className="w100 mt4 flex flex-column items-center">
          <p className="bold big center mb3">
            Did you have a date in mind for your event?
          </p>
          <TextField
            className="w100 text-container-width"
            variant="square"
            placeholder="Choose a Weekend"
            type="date"
          />
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
              const partyLength = this.state.partyTypes.length;
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
                    onClick={() => this.setState({ selectedPartyType: label })}
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
                          'uppercase tout'
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
            className={cx(styles['PartyRequestForm__help-text'], 'center mb3')}
          >
            Maximum number of 55
          </p>
          <TextField
            className="w100 text-container-width"
            variant={selectedNumberOfGuests ? 'square--selected' : 'square'}
            placeholder="Enter number of guests"
            onChange={value => this.setState({ selectedNumberOfGuests: value })}
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
            {partyAddOns.map(partyAddOn => {
              const partyAddOnsLength = partyAddOns.length;

              return (
                <div key={partyAddOn.value} className="col-6 p1">
                  <Button
                    onClick={() => this.addOnClick(partyAddOn.value)}
                    className="center wh100 "
                    variant={
                      selectedAddOns.includes(partyAddOn.value)
                        ? 'square--selected'
                        : 'square'
                    }
                  >
                    <div className="flex flex-column wh100">
                      <p className="mb1 white-space-normal center">
                        {partyAddOn.value}
                      </p>
                      <p className="white-space-normal">{`$${
                        partyAddOn.price
                      }`}</p>
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
          {error || formStatus === REJECTED ? (
            <FormFlash
              className="w100 mb2"
              error={true}
              message={
                error
                  ? error
                  : 'There was an unexpected problem while submitting your message. Please reach out directly to info@amplehills.com'
              }
            />
          ) : null}
          {formStatus === FULFILLED ? (
            <FormFlash
              className="w100 mb2"
              success={true}
              message="Your message has been sent!"
            />
          ) : null}
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
                          className={cx(styles['PartyRequestForm__help-text'])}
                        >{`Addon: ${addOn}`}</p>
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
                  Deposit total $100.00
                </p>
                <p className={cx(styles['PartyRequestForm__help-text'], 'mb3')}>
                  Statement that mentions what the customer can expect after
                  making this deposit
                </p>
                <div>
                  <Button
                    onClick={this.handleMakeDeposit}
                    color="madison-blue"
                    className="inline-flex"
                    label="Make Deposit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PartyRequestForm.propTypes = {};

PartyRequestForm.defaultProps = {};

export default PartyRequestForm;

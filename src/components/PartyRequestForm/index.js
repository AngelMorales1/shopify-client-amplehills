import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import Global from 'constants/Global';

import {
  Image,
  Button,
  TextField,
  FormFlash,
  Dropdown,
  Radio
} from 'components/base';
import styles from './PartyRequestForm.scss';

class PartyRequestForm extends Component {
  state = {
    ccurrentBreakpoint: Global.breakpoints.medium.label
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

  render() {
    const locations = get(this, 'props.partyAvailableLocations', []);
    const timeSlots = [
      '11am to 1pm',
      '2pm to 4pm',
      '5pm to 7pm',
      '8pm to 10pm'
    ];
    const partyTypes = ['Bike Party', 'Scoop Tab Party'];
    const ageGroups = ['2 - 5', '4 - 6', '7 -10', '11 - 13'];
    const partyAddOns = [
      { value: 'Our Food & Drink Package1', price: 60.0 },
      { value: 'Our Food & Drink Package2', price: 60.0 },
      { value: 'Our Food & Drink Package3', price: 60.0 }
    ];

    return (
      <div className="w100 flex flex-column items-center">
        <h2 className="block-headline center my4">Party Request Form</h2>
        <div className="w100 mt4 flex flex-column items-center">
          <p className="bold big center mb3">
            At which location would you like to host your party?{' '}
          </p>
          <Button
            variant="primary-small"
            color="peach"
            label="More Info"
            className="uppercase mb3 tout"
          />
          <Dropdown
            className="w100 z-1 text-container-width"
            color="peach"
            variant="square"
            placeholder="Choose a Location"
            options={locations.map(location => {
              const title = location.title;

              return { label: title, value: title };
            })}
          />
        </div>
        <div className="w100 mt4 flex flex-column items-center">
          <p className="bold big center mb3">
            Did you have a weekend in mind for your event?
          </p>
          <Dropdown
            className="text-container-width w100 z-1"
            color="peach"
            variant="square"
            placeholder="Choose a Weekend"
            options={locations.map(location => {
              const title = location.title;

              return { label: title, value: title };
            })}
          />
        </div>
        <div className="w100 mt4 flex flex-column items-center">
          <p className="bold big center mb3">
            Of these time slots, which is your first choice?
          </p>
          <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
            {timeSlots.map(timeSlot => {
              const timeSlotsLength = timeSlots.length;

              return (
                <div
                  key={timeSlot}
                  style={{ width: this.getButtonWidth(timeSlotsLength) }}
                  className={cx(
                    styles['PartyRequestForm__button-container'],
                    'p1'
                  )}
                >
                  <Button
                    className="center wh100 white-space-normal"
                    variant="square"
                    label={timeSlot}
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
            {partyTypes.map(partyType => {
              const partyLength = partyTypes.length;

              return (
                <div
                  key={partyType}
                  style={{ width: this.getButtonWidth(partyLength) }}
                  className="p1"
                >
                  <Button
                    className="center wh100 white-space-normal"
                    variant="square"
                    label={partyType}
                  />
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
            variant="square"
            placeholder="Enter number of guests"
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
                    className="center wh100 white-space-normal"
                    variant="square"
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
            variant="square"
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
                  <Button className="center wh100 " variant="square">
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
            variant="square"
            placeholder="Add a note"
          />
        </div>
        <div className="bg-tuft-bush w100 flex flex-row space-between p4 mt4">
          <div className="col-12 md-col-6 flex justify-center">
            <div
              className={cx(styles['PartyRequestForm__footer-text-container'])}
            >
              <p
                className={cx(
                  styles[('PartyRequestForm__footer-text', 'bold')]
                )}
              >
                Summary
              </p>
              <p className={cx(styles['PartyRequestForm__help-text'])}>
                Please make required selections
              </p>
            </div>
          </div>
          <div className="col-12 md-col-6 flex justify-center">
            <div
              className={cx(styles['PartyRequestForm__footer-text-container'])}
            >
              <p
                className={cx(styles['PartyRequestForm__footer-text'], 'bold')}
              >
                Deposit total $100.00
              </p>
              <p className={cx(styles['PartyRequestForm__help-text'])}>
                Statement that mentions what the customer can expect after
                making this deposit
              </p>
              <Button label="Make Deposit" />
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

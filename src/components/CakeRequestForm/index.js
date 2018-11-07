import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import { Image, Button, TextField, FormFlash, Dropdown } from 'components/base';

class CakeRequestForm extends Component {
  render() {
    const locations = get(this, 'props.locations', {});
    const locationIds = get(this, 'props.locationIds', []);

    return (
      <div className="flex flex-wrap my4">
        <div className="flex flex-wrap max-width-4 mx-auto">
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">
              Where would you like to pick up your cake?
            </p>
            <Dropdown
              className="w100 text-container-width"
              color="peach"
              variant="square"
              placeholder="Choose a Location"
              value=""
              onChange={filter => this.handleLocationChange(filter)}
              options={locationIds.map(locationId => {
                const title = locations[locationId].title;

                return { label: title, value: locationId };
              })}
            />
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">
              Who will be picking up your ice cream cake?
            </p>
            <TextField
              className="w100 text-container-width"
              variant="square"
              placeholder="Enter number of guests"
              onChange={value =>
                this.setState({ selectedNumberOfGuests: value })
              }
            />
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">
              What is the best phone number to reach you?
            </p>
            <TextField
              className="w100 text-container-width"
              variant="square"
              placeholder="Enter your phone number"
              onChange={value =>
                this.setState({ selectedNumberOfGuests: value })
              }
            />
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">Pick a size!</p>
            <p className={cx('center mb3')}>Maximum number of 55</p>
            <TextField
              className="w100 text-container-width"
              variant="square"
              placeholder="Enter your phone number"
              onChange={value =>
                this.setState({ selectedNumberOfGuests: value })
              }
            />
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">Choose a filling</p>
            <TextField
              className="w100 text-container-width"
              variant="square"
              placeholder="Enter your phone number"
              onChange={value =>
                this.setState({ selectedNumberOfGuests: value })
              }
            />
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">Additional toppings</p>
            <TextField
              className="w100 text-container-width"
              variant="square"
              placeholder="Enter your phone number"
              onChange={value =>
                this.setState({ selectedNumberOfGuests: value })
              }
            />
          </div>
        </div>
        <div className="w100 bg-tuft-bush py4" />
      </div>
    );
  }
}

export default CakeRequestForm;

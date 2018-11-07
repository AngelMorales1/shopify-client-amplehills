import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import { Image, Button, TextField, FormFlash, Dropdown } from 'components/base';

class CakeRequestForm extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      size: get(props, 'cakeDeposit.variants[0]', {})
    };
  }

  render() {
    const product = get(this, 'props.cakeDeposit', {});
    const variants = get(product, 'variants', []);
    const flavors = get(this, 'props.cakeFlavors', []);
    const fillings = get(this, 'props.cakeFillings', []);
    const toppings = get(this, 'props.cakeToppings', []);
    const locations = get(this, 'props.cakeLocations', {});

    return (
      <div className="flex flex-wrap my4">
        <div className="flex flex-wrap max-width-4 mx-auto my4">
          <div className="w100 mb4">
            <h1 className="w100 block-headline center mb3">
              Order Your Custom Ice Cream Cake
            </h1>
            <h2 className="w100 big bold center text-peach mb3">
              First, let's work out the details
            </h2>
          </div>
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
              options={Object.values(locations).map(location => ({
                label: location.title,
                value: location.id
              }))}
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

          <div className="w100 mt2 mb4">
            <h2 className="w100 big bold center text-peach mb3">
              Now, the fun stuff!
            </h2>
          </div>

          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">Pick a size!</p>
            <p className={cx('center mb3')}>Maximum number of 55</p>
            <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
              {variants.map((variant, i) => {
                const price = get(variant, 'price', (0.0).toFixed(2));
                const title = get(variant, 'title', '');
                const id = get(variant, 'id', title);

                return (
                  <div key={id || i} className="col-6 p1">
                    <Button
                      onClick={() => this.handleSizeChange(variant)}
                      className="center wh100"
                      variant={'square'}
                    >
                      <div className="inline-flex flex-column w100 my2">
                        <p className="mb1 white-space-normal center">{title}</p>
                        <p className="white-space-normal light">{price}</p>
                      </div>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">Choose a flavor!</p>
            <Dropdown
              className="w100 text-container-width"
              color="peach"
              variant="square"
              placeholder="Choose a Flavor"
              value=""
              onChange={this.handleFlavorChange}
              options={flavors.map(flavor => ({
                label: flavor.title,
                value: flavor.title
              }))}
            />
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">Choose a filling!</p>
            <div className="form-container-width w100 flex flex-wrap justify-center">
              {fillings.map(filling => {
                return (
                  <div key={filling.uuid} className="col-3 p1">
                    <Button
                      className="center wh100 white-space-normal"
                      variant={'square'}
                      label={filling.title}
                      onClick={() =>
                        this.setState({ selectedTimeSlot: filling })
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">Add additional toppings!</p>
            <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
              {toppings.map((topping, i) => {
                return (
                  <div key={get(topping, 'id', i)} className="col-6 p1">
                    <Button
                      onClick={() => this.handleAddOnClick(topping.title)}
                      className="center wh100 "
                      variant={'square'}
                    >
                      <div className="inline-flex flex-column w100 my2">
                        <p className="mb1 white-space-normal center">
                          {topping.title}
                        </p>
                        <p className="white-space-normal light">
                          {topping.price}
                        </p>
                      </div>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w100 bg-tuft-bush py4" />
      </div>
    );
  }
}

export default CakeRequestForm;

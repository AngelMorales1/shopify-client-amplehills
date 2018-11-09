import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import checkoutModel from 'models/checkoutModel';
import locationModel from 'models/locationModel';
import productModel from 'models/locationModel';

import { Button, TextField, Dropdown } from 'components/base';
import styles from './CakeRequestForm.scss';

class CakeRequestForm extends Component {
  state = {
    location: null,
    name: null,
    phone: null,
    size: null,
    flavor: null,
    secondFlavor: null,
    filling: null,
    toppings: []
  };

  openFlavorModal = () => this.setState({ flavorModalIsOpen: true });
  closeFlavorModal = () => this.setState({ flavorModalIsOpen: false });
  validateForm = () => Object.values(this.state).every(value => value !== null);

  handleLocationChange = location => this.setState({ location });
  handleNameChange = name => this.setState({ name });
  handlePhoneChange = phone => this.setState({ phone });
  handleSizeChange = size => this.setState({ size });
  handleFlavorChange = flavor => this.setState({ flavor });
  handleSecondFlavorChange = secondFlavor => this.setState({ secondFlavor });
  handleFillingChange = filling => this.setState({ filling });

  handleAddTopping = topping => {
    const { toppings } = this.state;
    if (toppings.includes(topping)) return null;

    const newToppings = toppings.concat([topping]);
    return this.setState({ toppings: newToppings });
  };

  handleRemoveTopping = topping => {
    const { toppings } = this.state;
    if (!toppings.includes(topping)) return null;

    const newToppings = toppings.filter(
      includedTopping => includedTopping !== topping
    );
    return this.setState({ toppings: newToppings });
  };

  getCakeAttributes = () => [
    {
      key: 'Pickup Location',
      value: this.state.location.label
    },
    {
      key: 'Name',
      value: this.state.name
    },
    {
      key: 'Phone',
      value: this.state.phone
    },
    {
      key: 'Size',
      value: this.state.size.title
    },
    {
      key: 'Flavor 1',
      value: this.state.flavor.label
    },
    {
      key: 'Flavor 2',
      value: this.state.secondFlavor.label
    },
    {
      key: 'Filling',
      value: this.state.filling
    },
    {
      key: 'Toppings',
      value: this.state.toppings.join(', ')
    },
    {
      key: 'Fulfillment',
      value: this.props.cakeLocations[this.state.location.value].cakesBucket
    }
  ];

  submitDeposit = () => {
    const formIsValid = this.validateForm();
    if (!formIsValid) return null;

    const items = [
      {
        variantId: get(this, 'state.size.id', ''),
        quantity: 1,
        customAttributes: this.getCakeAttributes()
      }
    ];

    this.props.actions.addLineItems(get(this, 'props.checkout.id'), items);
  };

  render() {
    const formIsValid = this.validateForm();

    const product = get(this, 'props.cakeDeposit', {});
    const variants = get(product, 'variants', []);
    const suggestedFlavors = get(this, 'props.cakeFlavors', []);
    const fillings = get(this, 'props.cakeFillings', []);
    const toppings = get(this, 'props.cakeToppings', []);
    const locations = get(this, 'props.cakeLocations', {});

    const selectedLocation = this.state.location
      ? locations[this.state.location.value]
      : null;

    const availableFlavors = selectedLocation
      ? selectedLocation.availableFlavors.map(flavor =>
          get(flavor, 'fields.title', '')
        )
      : [];

    return (
      <div className="flex flex-wrap my4">
        <div className="flex flex-wrap max-width-4 mx-auto my4">
          <div className="w100 mb4">
            <h1 className="w100 block-headline center mb3">
              Order Your Custom Ice Cream Cake
            </h1>
            <h2 className="w100 big bold center text-peach mb3">
              {`First, let's work out the details`}
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
              value={get(this, 'state.location.value', null)}
              onChange={this.handleLocationChange}
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
              placeholder="Enter a name"
              onChange={this.handleNameChange}
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
              onChange={this.handlePhoneChange}
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
                      variant={
                        get(this, 'state.size.id', null) === id
                          ? 'square--selected'
                          : 'square'
                      }
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
            <Button
              variant="primary-small"
              color="peach"
              label="Need Help?"
              className="uppercase mb3 tout"
              onClick={this.openFlavorModal}
            />
            <Dropdown
              className="w100 text-container-width"
              color="peach"
              variant="square"
              placeholder="Choose a Flavor"
              value={get(this, 'state.flavor.value', null)}
              onChange={this.handleFlavorChange}
              options={availableFlavors.map(flavor => ({
                label: flavor,
                value: flavor
              }))}
            />
            <span
              className={cx('mt2', {
                'text-white': !!selectedLocation,
                'text-peach': !selectedLocation
              })}
            >
              You must first select a location
            </span>
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">Choose a second flavor!</p>
            <Dropdown
              className="w100 text-container-width"
              color="peach"
              variant="square"
              disabled={!selectedLocation}
              placeholder="Choose a Flavor"
              value={get(this, 'state.secondFlavor.value', null)}
              onChange={this.handleSecondFlavorChange}
              options={availableFlavors.map(flavor => ({
                label: flavor,
                value: flavor
              }))}
            />
            <span
              className={cx('mt2', {
                'text-white': !!selectedLocation,
                'text-peach': !selectedLocation
              })}
            >
              You must first select a location
            </span>
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">Choose a filling!</p>
            <div className="form-container-width w100 flex flex-wrap justify-center">
              {fillings.map(filling => {
                return (
                  <div key={filling.title} className="col-3 p1">
                    <Button
                      className="center wh100 white-space-normal"
                      variant={
                        get(this, 'state.filling', null) === filling.title
                          ? 'square--selected'
                          : 'square'
                      }
                      label={filling.title}
                      onClick={() => this.handleFillingChange(filling.title)}
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
                const selectedToppings = this.state.toppings;
                const toppingIsSelected = selectedToppings.includes(
                  topping.title
                );

                return (
                  <div key={get(topping, 'id', i)} className="col-6 p1">
                    <Button
                      onClick={
                        toppingIsSelected
                          ? () => this.handleRemoveTopping(topping.title)
                          : () => this.handleAddTopping(topping.title)
                      }
                      className="center wh100"
                      variant={
                        toppingIsSelected ? 'square--selected' : 'square'
                      }
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
        <div className="w100 bg-tuft-bush py4">
          <div className="max-width-3 mx-auto flex flex-wrap">
            <div className="col-12 md-col-7 flex flex-column">
              <span className="bold big mb3">Summary</span>
              {formIsValid ? (
                <div className="flex flex-column pr3">
                  <span className="line-height">
                    <span className="bold">Pickup Location: </span>
                    {this.state.location.label}
                  </span>
                  <span className="line-height">
                    <span className="bold">Name: </span>
                    {this.state.name}
                  </span>
                  <span className="line-height">
                    <span className="bold">Phone: </span>
                    {this.state.phone}
                  </span>
                  <span className="line-height">
                    <span className="bold">Size: </span>
                    {this.state.size.title}
                  </span>
                  <span className="line-height">
                    <span className="bold">Flavor 1: </span>
                    {this.state.flavor.label}
                  </span>
                  <span className="line-height">
                    <span className="bold">Flavor 2: </span>
                    {this.state.secondFlavor.label}
                  </span>
                  <span className="line-height">
                    <span className="bold">Filling: </span>
                    {this.state.filling}
                  </span>
                  <span className="line-height">
                    <span className="bold">Toppings: </span>
                    {this.state.toppings.join(', ')}
                  </span>
                </div>
              ) : (
                <span className="line-height">Please fill out all fields.</span>
              )}
            </div>
            <div className="col-12 md-col-5 flex flex-column items-start">
              <span className="bold big mb3">
                Deposit total{this.state.size
                  ? `: $${this.state.size.price}`
                  : ''}
              </span>
              <span className="line-height">
                You will be asked to pay for any additional items or products
                upon picking up the cake.
              </span>
              <Button
                disabled={!formIsValid}
                onClick={this.submitDeposit}
                color="madison-blue"
                className="mt3 inline-block w-auto"
                label="Make Deposit"
              />
            </div>
          </div>
        </div>
        {this.state.flavorModalIsOpen ? (
          <div
            className={cx(
              'overflow-scroll fixed-cover bg-white-wash flex justify-center items-center transition-fade-in'
            )}
          >
            <div
              className={cx(
                'wh100 modal modal--light-gray-border max-width-2 mx-auto relative flex items-center justify-center bg-white drop-shadow transition-slide-up-large-long'
              )}
            >
              <div className="wh100 m-auto flex flex-column mb3 justify-center">
                <div
                  className={cx(
                    styles['CakeRequestForm__modal__info'],
                    'absolute t0 l0 w100 p3 overflow-scroll'
                  )}
                >
                  <div className="mb3">
                    <h3 className="callout mb1">
                      Suggested Ice Cream Cake Flavors
                    </h3>
                    <p
                      className={cx(
                        styles['CakeRequestForm__modal__text'],
                        'mb1'
                      )}
                    >
                      Overwhelmed by options? You’re not alone. Check out our
                      three most popular ice cream cake flavor pairings.
                    </p>
                  </div>
                  {Object.values(suggestedFlavors).map(flavor => {
                    return (
                      <div key={flavor.title} className="my3 pr3">
                        <p className="bold mb1">{flavor.title}</p>
                        <p
                          className={cx(
                            styles['CakeRequestForm__modal__text'],
                            'mb1'
                          )}
                        >
                          {flavor.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div
                  className={cx(
                    styles['CakeRequestForm__modal__close-bar'],
                    'absolute b0 l0 w100 p1 bg-white'
                  )}
                >
                  <Button
                    className={cx('right')}
                    color="madison-blue"
                    label="Close"
                    onClick={this.closeFlavorModal}
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

CakeRequestForm.propTypes = {
  cakeLocations: PropTypes.objectOf(locationModel.propTypes),
  cakeFlavors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string
    })
  ),
  cakeToppings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.string
    })
  ),
  cakeFillings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string
    })
  ),
  cakeDeposit: productModel.propTypes,
  actions: PropTypes.shape({
    addLineItems: PropTypes.func
  }),
  checkout: checkoutModel.propTypes
};

CakeRequestForm.defaultProps = {
  cakeLocations: {},
  cakeFlavors: [],
  cakeToppings: [],
  cakeFillings: [],
  cakeDeposit: {},
  actions: {
    addLineItems: f => f
  },
  checkout: checkoutModel.defaultProps
};

export default CakeRequestForm;

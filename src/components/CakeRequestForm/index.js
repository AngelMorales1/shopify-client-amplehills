import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import checkoutModel from 'models/checkoutModel';
import locationModel from 'models/locationModel';
import productModel from 'models/locationModel';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Button, TextField, Dropdown, Image } from 'components/base';
import styles from './CakeRequestForm.scss';

class CakeRequestForm extends Component {
  state = {
    location: null,
    pickupDate: null,
    pickupTime: null,
    name: null,
    phone: null,
    size: null,
    flavor: null,
    secondFlavor: null,
    filling: null,
    sprinkle: null,
    toppings: [],
    dayPickerIsSelected: false,
    buildYourOwn: false,
    recommendFlavorId: ''
  };

  openFlavorModal = () => this.setState({ flavorModalIsOpen: true });
  closeFlavorModal = () => this.setState({ flavorModalIsOpen: false });
  validateForm = () => Object.values(this.state).every(value => value !== null);

  handleLocationChange = location =>
    this.setState({ location, pickupTime: null });
  handleDayClick = day => {
    if (moment(day).isAfter(moment().add(2, 'days'))) {
      this.setState({
        pickupDate: moment(day).format('MMMM DD')
      });
    }
  };
  handlePickupTimeChange = pickupTime => this.setState({ pickupTime });
  handleNameChange = name => this.setState({ name });
  handlePhoneChange = phone => this.setState({ phone });
  handleSizeChange = size => this.setState({ size });
  handleFlavorChange = flavor => this.setState({ flavor });
  handleSecondFlavorChange = secondFlavor => this.setState({ secondFlavor });
  handleFillingChange = filling => this.setState({ filling });
  handleSprinkleChange = sprinkle => this.setState({ sprinkle });

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

  handleRecommendFlavorChange = (
    recommendFlavorId,
    flavor1,
    flavor2,
    filling
  ) =>
    this.setState({
      buildYourOwn: false,
      recommendFlavorId,
      flavor: { label: flavor1, value: flavor1 },
      secondFlavor: { label: flavor2, value: flavor2 },
      filling
    });

  handleBuildYourOwnChange = () =>
    this.setState({
      buildYourOwn: true,
      recommendFlavorId: '',
      flavor: null,
      secondFlavor: null,
      filling: null
    });

  getCakeAttributes = () => [
    {
      key: 'Pickup Location',
      value: this.state.location.label
    },
    {
      key: 'Pickup Date',
      value: this.state.pickupDate
    },
    {
      key: 'Pickup Time',
      value: this.state.pickupTime
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
      key: 'Base',
      value: this.state.filling
    },
    {
      key: 'sprinkle',
      value: this.state.sprinkle
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
    const sprinkles = get(this, 'props.cakeSprinkles', []);
    const toppings = get(this, 'props.cakeToppings', []);
    const locations = get(this, 'props.cakeLocations', {});
    const cakeRecommendations = get(this, 'props.cakeRecommendations', []);
    const { pickupDate, dayPickerIsSelected } = this.state;
    const { today, daysAfter } = this.props;
    const selectedLocation = this.state.location
      ? locations[this.state.location.value]
      : null;
    const cakeSizes = get(this, 'props.cakeSizes', {});
    const availableFlavors = selectedLocation
      ? selectedLocation.availableFlavors.map(flavor =>
          get(flavor, 'fields.title', '')
        )
      : [];
    const defaultTimeSlots = [
      {
        endTime: '5pm',
        index: 0,
        startTime: '12pm',
        uuid: 'defaultTimeSlot1'
      },
      {
        endTime: 'closing',
        index: 1,
        startTime: '5pm',
        uuid: 'defaultTimeSlot2'
      }
    ];
    const pickupTimeSlots =
      selectedLocation && selectedLocation.cakePickupTimeSlots.length
        ? selectedLocation.cakePickupTimeSlots
        : defaultTimeSlots;

    return (
      <div className="flex flex-wrap my4">
        <div className="flex flex-wrap max-width-4 mx-auto my4 px2">
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
              Where would you like to pick up your ice cream cake?
            </p>
            <Dropdown
              className="w100 text-container-width z-sub-nav"
              color="peach"
              variant={this.state.location ? 'square--selected' : 'square'}
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
              When would you like to pick up your ice cream cake?
            </p>
            <p className={cx('center mb3 help-text-container-width')}>
              Please note, we need 48 hours minimum to create your custom ice
              cream cake.
            </p>
            <Button
              childrenWrapperClassName="w100 justify-between"
              variant="style-none"
              onClick={() =>
                this.setState({
                  dayPickerIsSelected: !this.state.dayPickerIsSelected
                })
              }
              className={cx(
                styles['CakeRequestForm__day-picker-container'],
                'w100 text-container-width relative z-1',
                {
                  [styles[
                    'CakeRequestForm__day-picker-container--selected'
                  ]]: pickupDate
                }
              )}
            >
              {pickupDate ? (
                <p className="bold text-madison-blue">{pickupDate}</p>
              ) : (
                <p className="bold text-dusty-gray">Choose a day</p>
              )}
              <Image
                className={cx(
                  styles['CakeRequestForm__day-picker-button'],
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
                  styles['CakeRequestForm__day-picker'],
                  'absolute t0 l0 mt4 bg-white text-madison-blue',
                  {
                    hide: !dayPickerIsSelected
                  }
                )}
                onMonthChange={() => {
                  this.setState({ dayPickerIsSelected: true });
                }}
                onDayClick={day => this.handleDayClick(day)}
                disabledDays={[
                  today,
                  {
                    before: daysAfter
                  }
                ]}
                initialMonth={today}
              />
            </Button>
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">
              What time of day will you be picking up your ice cream cake?
            </p>
            <div className="form-container-width w100 flex flex-wrap justify-center">
              {pickupTimeSlots.map(timeSlot => {
                const timeSlotLabel = `${timeSlot.startTime} to ${
                  timeSlot.endTime
                }`;

                return (
                  <div key={timeSlot.uuid} className="col-6 md-col-3 p1">
                    <Button
                      className="center wh100 white-space-normal px2"
                      variant={
                        get(this, 'state.pickupTime', null) === timeSlotLabel
                          ? 'square--selected'
                          : 'square'
                      }
                      label={timeSlotLabel}
                      onClick={() => this.handlePickupTimeChange(timeSlotLabel)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">
              Who will be picking up your ice cream cake?
            </p>
            <TextField
              className="w100 text-container-width"
              variant={this.state.name ? 'square--selected' : 'square'}
              placeholder="Name"
              onChange={this.handleNameChange}
            />
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">
              What’s the best phone number to reach you?
            </p>
            <TextField
              className="w100 text-container-width"
              variant={this.state.phone ? 'square--selected' : 'square'}
              placeholder="Phone number"
              onChange={this.handlePhoneChange}
            />
          </div>

          <div className="w100 mt2 mb4">
            <h2 className="w100 big bold center text-peach mb3">
              Now, the fun stuff!
            </h2>
          </div>

          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">Pick a size</p>
            <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
              {variants.map((variant, i) => {
                const price = get(variant, 'price', (0.0).toFixed(2));
                const title = get(variant, 'title', '');
                const id = get(variant, 'id', title);
                const description = get(cakeSizes, `${title}.description`, '');

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
                        <p className="mb1 white-space-normal light">
                          {description}
                        </p>
                        <p className="white-space-normal light">${price}</p>
                      </div>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">
              Pick your ice cream cake flavor combination!
            </p>
            <Button
              variant="primary-small"
              color="peach"
              label="Need Help?"
              className={cx(
                styles['CakeRequestForm__help-button'],
                'uppercase mb3 tout'
              )}
              onClick={this.openFlavorModal}
            />
            <p className="bold big center mb2">We recommend these</p>
            <div className="form-container-width w100 flex flex-row flex-wrap justify-center">
              {cakeRecommendations.map((cakeRecommendation, i) => {
                const title = get(cakeRecommendation, 'title', '');
                const id = get(cakeRecommendation, 'id', title);
                const base = get(cakeRecommendation, 'base', '');
                const flavor1 = get(cakeRecommendation, 'flavor1', '');
                const flavor2 = get(cakeRecommendation, 'flavor2', '');

                return (
                  <div key={id || i} className="col-6 p1">
                    <Button
                      onClick={() =>
                        this.handleRecommendFlavorChange(
                          id,
                          flavor1,
                          flavor2,
                          base
                        )
                      }
                      className="center wh100"
                      variant={
                        get(this, 'state.recommendFlavorId', null) === id
                          ? 'square--selected'
                          : 'square'
                      }
                    >
                      <div className="inline-flex flex-column w100 my2">
                        <p className="mb2 white-space-normal center">{title}</p>
                        <p className="white-space-normal light line-height">
                          <span className="bold">{`${flavor1} `}</span>
                          paired with
                          <span className="bold">{` ${flavor2} `}</span>
                          on a {base}
                        </p>
                      </div>
                    </Button>
                  </div>
                );
              })}
              <div className="col-6 p1">
                <Button
                  onClick={() => this.handleBuildYourOwnChange()}
                  className="center wh100"
                  variant={
                    get(this, 'state.buildYourOwn', false)
                      ? 'square--selected'
                      : 'square'
                  }
                >
                  <div className="inline-flex flex-column w100 my2">
                    <p className="mb2 white-space-normal center">
                      Build your own with your choice of flavors!
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div
            className={cx(
              styles['CakeRequestForm__build-your-own'],
              'w100 flex flex-column items-center',
              {
                [styles['CakeRequestForm__build-your-own--disable']]: !this
                  .state.buildYourOwn
              }
            )}
          >
            <div className="w100 mb4 flex flex-column items-center">
              <p className="bold big center mb2">Choose your first flavor</p>
              <Dropdown
                className="w100 text-container-width z-sub-nav"
                color="peach"
                variant={this.state.flavor ? 'square--selected' : 'square'}
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
              <p className="bold big center mb2">Choose your second flavor</p>
              <Dropdown
                className="w100 text-container-width"
                color="peach"
                variant={
                  this.state.secondFlavor ? 'square--selected' : 'square'
                }
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
              <p className="bold big center mb2">Pick a base</p>
              <p className={cx('center mb3 help-text-container-width')}>
                All ice cream cakes come with a layer of fudge in between the
                layers of ice cream.
              </p>
              <div className="form-container-width w100 flex flex-wrap justify-center">
                {fillings.map(filling => {
                  return (
                    <div key={filling.title} className="col-6 md-col-3 p1">
                      <Button
                        className="center wh100 white-space-normal px3"
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
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">
              What kind of sprinkles would you like?{' '}
            </p>
            <p className={cx('center mb3 help-text-container-width')}>
              Each ice cream cake is made with a topping of whipped cream and
              sprinkles.
            </p>
            <div className="form-container-width w100 flex flex-wrap justify-center">
              {sprinkles.map(sprinkle => {
                return (
                  <div key={sprinkle.title} className="col-6 md-col-3 p1">
                    <Button
                      className="center wh100 white-space-normal px3"
                      variant={
                        get(this, 'state.sprinkle', null) === sprinkle.title
                          ? 'square--selected'
                          : 'square'
                      }
                      label={sprinkle.title}
                      onClick={() => this.handleSprinkleChange(sprinkle.title)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w100 mb4 flex flex-column items-center">
            <p className="bold big center mb2">
              Would you like any additional toppings?{' '}
            </p>
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
        <div className="w100 bg-pastel-peach py4">
          <div className="max-width-3 mx-auto flex flex-wrap px3">
            <div className="col-12 md-col-7 flex flex-column mb4">
              <span className="bold big mb3">Summary</span>
              {formIsValid ? (
                <div className="flex flex-column pr3">
                  <span className="line-height small">
                    <span className="bold">Pickup Location: </span>
                    {this.state.location.label}
                  </span>
                  <span className="line-height small">
                    <span className="bold">Pickup Date: </span>
                    {this.state.pickupDate}
                  </span>
                  <span className="line-height small">
                    <span className="bold">Pickup Time: </span>
                    {this.state.pickupTime}
                  </span>
                  <span className="line-height">
                    <span className="bold">Name: </span>
                    {this.state.name}
                  </span>
                  <span className="line-height small">
                    <span className="bold">Phone: </span>
                    {this.state.phone}
                  </span>
                  <span className="line-height small">
                    <span className="bold">Size: </span>
                    {this.state.size.title}
                  </span>
                  <span className="line-height small">
                    <span className="bold">Flavor 1: </span>
                    {this.state.flavor.label}
                  </span>
                  <span className="line-height small">
                    <span className="bold">Flavor 2: </span>
                    {this.state.secondFlavor.label}
                  </span>
                  <span className="line-height small">
                    <span className="bold">Base: </span>
                    {this.state.filling}
                  </span>
                  <span className="line-height small">
                    <span className="bold">Sprinkle: </span>
                    {this.state.sprinkle}
                  </span>
                  <span className="line-height small">
                    <span className="bold">Toppings: </span>
                    {this.state.toppings.join(', ')}
                  </span>
                </div>
              ) : (
                <span className="line-height small">
                  Please fill out all fields.
                </span>
              )}
            </div>
            <div className="col-12 md-col-5 flex flex-column items-start">
              <span className="bold big mb3">
                Deposit total{this.state.size
                  ? `: $${this.state.size.price}`
                  : ''}
              </span>
              <span className="line-height small">
                Thank you so much for your order! Our Amployees can’t wait to
                make your cake. If we have any questions, we’ll reach out to
                you. We’ll see you at the shop.
              </span>
              <Button
                disabled={!formIsValid}
                onClick={this.submitDeposit}
                color="madison-blue"
                className={cx(
                  styles['CakeRequestForm__button'],
                  'mt3 inline-block w-auto'
                )}
                label="Add to cart!"
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
                    'absolute b0 l0 w100 p2 bg-white flex flex-row justify-end items-center'
                  )}
                >
                  <Button
                    color="madison-blue"
                    variant="primary-small"
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
  checkout: checkoutModel.propTypes,
  today: PropTypes.instanceOf(Date),
  daysAfter: PropTypes.instanceOf(Date)
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
  checkout: checkoutModel.defaultProps,
  today: new Date(2019, 1, 1),
  daysAfter: new Date(2019, 1, 1)
};

export default CakeRequestForm;

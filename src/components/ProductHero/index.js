import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PENDING, FULFILLED } from 'constants/Status';

import cx from 'classnames';
import get from 'utils/get';
import { Image, Button, QuantitySelector, Dropdown } from 'components/base';
import OurPledge from 'components/OurPledge';
// import OurPledgeOverlay from 'components/OurPledgeOverlay';

import styles from './ProductHero.scss';

class ProductHero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.addLineItemsStatus === PENDING &&
      this.props.addLineItemsStatus === FULFILLED
    )
      this.didAddToCart();
  }

  addToCart = () => {
    const variant = get(this.props, 'product.variants[0].id', {});
    const items = [
      {
        variantId: variant,
        quantity: this.state.quantity
      }
    ];

    this.props.addLineItems(this.props.checkout, items);
  };

  didAddToCart = () => {
    this.setState({ quantity: 1 });
  };

  onShippingChange = shipping => {
    // TODO: Figure out best way to add this to Checkout
    this.setState({ shipping });
  };

  render() {
    const { data, product, z } = this.props;
    const heroImage = get(product, 'images[0].src', '');
    const availability = get(product, 'variants[0].available', false);
    const price = get(product, 'variants[0].price', []);

    return (
      <div
        className={`${styles['ProductHero']} flex flex-wrap`}
        style={{ zIndex: z }}
      >
        <div
          className="col col-12 md-col-6 square"
          style={{
            background: `url(${heroImage}) no-repeat center`,
            backgroundSize: 'cover'
          }}
        />
        <div className="col col-12 md-col-6 py4 flex flex-column justify-around">
          <div className="col-12 md-col-8 px2 mx-auto">
            <div className="relative inline-block">
              <h1 className="block-headline mb4 relative z-1">
                {get(data, 'title')}
              </h1>
              <Image
                className={cx(
                  'absolute',
                  styles['ProductHero__title-illustration']
                )}
                src={get(data, 'titleIllustration.fields.file.url', '')}
              />
            </div>
            <div>
              <p className="copy pr2">{get(product, 'description', '')}</p>
            </div>
            <form className="flex flex-wrap items-center">
              <div className="w100 mt3 mb1">
                <Dropdown
                  name="shipping-date"
                  value={this.state.shipping}
                  label="Shipping Date"
                  onChange={this.onShippingChange}
                  options={this.props.shippingDates.map(date => {
                    return { value: date, label: date };
                  })}
                />
              </div>
              <QuantitySelector
                className="my3 mr3"
                quantity={this.state.quantity}
                onChange={value => this.setState({ quantity: value })}
              />
              <Button
                color="madison-blue"
                onClick={this.addToCart}
                disabled={!availability}
              >
                <span className="mr2">Add to Cart</span>
                <span className="ml2">
                  ${(price * this.state.quantity).toFixed(2)}
                </span>
              </Button>
            </form>
          </div>
          <OurPledge ourPledgeIcon={this.props.globalSettings.ourPledgeIcon} />
          {/* <OurPledgeOverlay /> */}
        </div>
      </div>
    );
  }
}

ProductHero.propTypes = {
  data: PropTypes.shape({}),
  z: PropTypes.number,
  product: PropTypes.shape({}),
  shippingDates: PropTypes.arrayOf(PropTypes.string)
};

ProductHero.defaultProps = {
  data: {},
  z: 1,
  product: {},
  shippingDates: []
};

export default ProductHero;

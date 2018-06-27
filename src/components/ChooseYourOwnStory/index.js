import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import products from 'state/selectors/products';
import fetchShippingDates from 'state/selectors/fetchShippingDates';
import get from 'utils/get';
import getLineItemPrice from 'utils/getLineItemPrice';

import { Radio, Image, Button, QuantitySelector } from 'components/base';
import Breadcrumbs from 'components/Breadcrumbs';
import OurPledge from 'components/OurPledge';
import ProductShoppableCard from 'components/ProductShoppableCard';
import styles from './ChooseYourOwnStory.scss';

class ChooseYourOwnStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 4,
      pints: [],
      shipping: '',
      quantity: 1
    };
  }

  handleSizeClick = size => {
    if (size >= this.state.pints.length) return this.setState({ size });

    const pints = this.state.pints.slice(0, size);
    this.setState({
      pints,
      size
    });
  };

  handleProductAddClick = id => {
    const { pints, size } = this.state;
    if (pints.length >= size) return null;

    pints.push(id);
    this.setState({ pints });
  };

  handleShippingClick = shipping => {
    this.setState({ shipping });
  };

  handleAddToCart = () => {
    const { pints, size, quantity } = this.state;
    if (pints.length !== size) return null;

    const variant = this.props.product.variants.find(
      variant => parseInt(variant.title, 10) === this.state.size
    );
    const items = [
      {
        variantId: variant.id,
        quantity
      }
    ];

    this.props.addLineItems(this.props.checkout, items);
  };

  render() {
    console.log(this.props);
    const { data, products, ourPledge } = this.props;
    const product =
      products[get(this.props.product, 'handle', 'choose-your-own-story')];
    const activeVariant = product.variants.find(
      variant => parseInt(variant.title, 10) === this.state.size
    );

    const shoppableProducts = get(data, 'products', []);
    const breadcrumbs = [
      {
        to: '/products',
        label: 'Order Online'
      },
      {
        to: '/products/choose-your-own-story',
        label: 'Choose Your Own Story'
      }
    ];

    return (
      <div className="mx-auto container-width">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="flex">
          <div className="col col-12 md-col-6 px2">
            {shoppableProducts.map(product => {
              const handle = get(product, 'fields.productHandle', '');
              if (!get(products, handle, false)) return null;

              return (
                <ProductShoppableCard
                  key={handle}
                  product={get(products, handle)}
                  onClick={() => this.handleProductAddClick(handle)}
                />
              );
            })}
          </div>
          <div className="col col-12 md-col-6 px4">
            <h1 className="block-headline mb4 relative z-1">
              {get(data, 'title')}
            </h1>
            <div className="w100 flex my3">
              {product.variants.map(variant => (
                <Radio
                  label={variant.title}
                  className="mr3"
                  checked={variant.id === activeVariant.id}
                  onClick={() =>
                    this.handleSizeClick(parseInt(variant.title, 10))
                  }
                />
              ))}
            </div>
            <div className="mb4">
              <p className="copy pr2">{get(data, 'description', '')}</p>
            </div>
            <OurPledge ourPledge={ourPledge} />
          </div>
        </div>
        <div className="fixed b0 l0 w100 bg-madison-blue text-white p3">
          <div className="flex content-width mx-auto w100">
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-size'],
                'col flex items-start'
              )}
            >
              {product.variants.map(variant => (
                <Radio
                  label={variant.title}
                  className="mr3"
                  checked={variant.id === activeVariant.id}
                  onClick={() =>
                    this.handleSizeClick(parseInt(variant.title, 10))
                  }
                  variant="vertical"
                  color="white"
                />
              ))}
            </div>
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-pints'],
                'col flex flex-wrap items-center'
              )}
            >
              <label>Choose 4 Flavors</label>
              <div className="flex justify-start w100 pt2">
                {this.state.pints.map(handle => (
                  <div
                    className={cx(
                      styles['ChooseYourOwnStory__pint-icon'],
                      'mr2'
                    )}
                  >
                    <Image src={get(products, `[${handle}].pintImage`, '')} />
                  </div>
                ))}
                {[...Array(this.state.size - this.state.pints.length)].map(
                  () => (
                    <div
                      className={cx(
                        styles['ChooseYourOwnStory__pint-icon'],
                        'mr2'
                      )}
                    >
                      <Image src="/assets/images/icon-pint.svg" />
                    </div>
                  )
                )}
              </div>
            </div>
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-shipping'],
                'col flex flex-wrap items-end'
              )}
            >
              <label className="w100 mb2">Pick Your Ship Date</label>
              {this.props.shipping.map(shipping => (
                <Button
                  variant="primary-small"
                  color={
                    shipping === this.state.shipping
                      ? 'white-madison-blue'
                      : 'madison-blue-outline'
                  }
                  className="small mr2"
                  label={shipping}
                  onClick={() => this.handleShippingClick(shipping)}
                />
              ))}
            </div>
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-add'],
                'col flex justify-between items-end'
              )}
            >
              <QuantitySelector
                color="madison-blue-outline"
                quantity={this.state.quantity}
                className="mr1"
                onChange={value => this.setState({ quantity: value })}
              />
              <Button
                className="small"
                disabled={
                  this.state.size !== this.state.pints.length ||
                  !this.state.shipping
                }
                variant="primary-small"
                color="white-madison-blue"
                onClick={this.handleAddToCart}
              >
                <span className="mr2">Add to Cart</span>
                <span>
                  ${getLineItemPrice(activeVariant.price, this.state.quantity)}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChooseYourOwnStory;

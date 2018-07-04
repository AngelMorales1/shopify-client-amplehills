import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import get from 'utils/get';
import getLineItemPrice from 'utils/getLineItemPrice';
import getPintSizeFromTitle from 'utils/getPintSizeFromTitle';
import Product from 'constants/types/Product';
import PintSizes from 'constants/PintSizes';
import Global from 'constants/Global';

import {
  Dropdown,
  Radio,
  Image,
  Button,
  QuantitySelector
} from 'components/base';
import Breadcrumbs from 'components/Breadcrumbs';
import OurPledge from 'components/OurPledge';
import ProductShoppableCard from 'components/ProductShoppableCard';
import styles from './ChooseYourOwnStory.scss';

class ChooseYourOwnStory extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      size: PintSizes.FOUR.size,
      pints: [],
      shippingDate: '',
      quantity: 1,
      currentBreakpoint: Global.breakpoints.small.label,
      screenHeight: 0,
      elementRect: {
        bottom: 0
      }
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateElement);
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
  }

  updateElement = () => {
    const elementRect = this.element.getBoundingClientRect();

    this.setState({ elementRect }, console.log(elementRect.bottom));
  };

  updateWindow = () => {
    const { innerWidth, innerHeight } = window;
    const { small, large } = Global.breakpoints;
    const currentBreakpoint =
      innerWidth <= large.lowerbound ? small.label : large.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });

    if (this.state.screenHeight !== innerHeight) this.setState({ screenHeight: innerHeight});
  };

  handleSizeClick = size => {
    const pints = get(this.state, 'pints', []);
    if (size >= pints.length) return this.setState({ size });

    const trimmedPints = pints.slice(0, size);
    this.setState({
      pints: trimmedPints,
      size
    });
  };

  handleAddProduct = handle => {
    const pints = get(this.state, 'pints', []);
    const size = get(this.state, 'size', PintSizes.FOUR.size);

    if (pints.length >= size) return null;
    this.setState({ pints: [...pints, handle] });
  };

  handleRemoveProduct = handle => {
    const currentPints = get(this.state, 'pints', []);

    let hasRemovedPint = false;
    const pints = currentPints.reduce((accumulated, pint) => {
      if (!hasRemovedPint && pint === handle) {
        hasRemovedPint = true;
      } else {
        accumulated.push(pint);
      }

      return accumulated;
    }, []);
    this.setState({ pints });
  };

  handleShippingDateClick = shippingDate => {
    this.setState({ shippingDate });
  };

  handleAddToCart = () => {
    const pints = get(this.state, 'pints', []);
    const size = get(this.state, 'size', PintSizes.FOUR.size);
    const quantity = get(this.state, 'quantity', 1);

    if (pints.length !== size) return null;

    const variant = this.props.product.variants.find(
      variant => getPintSizeFromTitle(variant.title) === size
    );
    const items = [
      {
        variantId: variant.id,
        quantity,
        customAttributes: pints.map((value, i) => {
          const key = `Item ${i + 1}`;
          return { key, value };
        })
      }
    ];

    this.props.actions.addLineItems(this.props.checkout, items);
  };

  render() {
    const pints = get(this.state, 'pints', []);
    const size = get(this.state, 'size', PintSizes.FOUR.size);
    const quantity = get(this.state, 'quantity', 1);
    const shipping = get(this.state, 'shippingDate', '');

    const { block, products, ourPledge } = this.props;
    const fields = get(block, 'fields', {});
    const product =
      products[get(this.props.product, 'handle', 'choose-your-own-story')];
    const activeVariant = product.variants.find(
      variant => getPintSizeFromTitle(variant.title) === size
    );

    const shoppableProducts = get(fields, 'products', []);
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
      <div
        className={cx(styles['ChooseYourOwnStory'], 'relative')}
        ref={element => (this.element = element)}
      >
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          className="mx-auto container-width"
        />
        <div className="mx-auto container-width flex items-start">
          <div
            className={cx(
              styles['ChooseYourOwnStory__product-cards'],
              'col-12 md-col-6 px2'
            )}
          >
            {shoppableProducts.map(product => {
              const handle = get(product, 'fields.productHandle', '');
              if (!get(products, handle, false)) return null;

              return (
                <ProductShoppableCard
                  key={handle}
                  product={get(products, handle)}
                  handleAddProduct={() => this.handleAddProduct(handle)}
                  handleRemoveProduct={() => this.handleRemoveProduct(handle)}
                  quantity={pints.filter(pint => pint === handle).length}
                />
              );
            })}
          </div>
          <div
            className={cx(
              styles['ChooseYourOwnStory__product-info'],
              'col-12 md-col-6'
            )}
          >
            <h1 className="block-headline mb4 relative z-1">
              {get(fields, 'title')}
            </h1>
            <div className="w100 flex my3">
              {product.variants.map(variant => (
                <Radio
                  label={variant.title}
                  className="mr3"
                  key={variant.id}
                  checked={variant.id === activeVariant.id}
                  onClick={() =>
                    this.handleSizeClick(parseInt(variant.title, 10))
                  }
                />
              ))}
            </div>
            <div className="mb4">
              <p className="copy pr2">{get(fields, 'description', '')}</p>
            </div>
            <OurPledge ourPledge={ourPledge} />
          </div>
        </div>
        <div
          className={cx(
            styles['ChooseYourOwnStory__menu'],
            'z-nav b0 l0 w100 bg-madison-blue text-white p3',
            {
              fixed:
                this.state.elementRect.bottom >= this.state.screenHeight,
              absolute:
                this.state.elementRect.bottom < this.state.screenHeight
            }
          )}
          style={{ bottom: 0 }}
        >
          <div className="flex content-width mx-auto w100">
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-size'],
                'col flex items-start xs-hide sm-hide md-hide'
              )}
            >
              {product.variants.map(variant => (
                <Radio
                  label={variant.title}
                  className="mr3"
                  key={variant.id}
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
                'col flex flex-wrap items-center xs-hide sm-hide md-hide'
              )}
            >
              <label>Choose 4 Flavors</label>
              <div className="flex justify-start w100 pt2">
                {pints.map((handle, i) => (
                  <div
                    key={i}
                    className={cx(
                      styles['ChooseYourOwnStory__pint-icon'],
                      'mr2'
                    )}
                  >
                    <Image src={get(products, `[${handle}].pintImage`, '')} />
                  </div>
                ))}
                {[...Array(size - pints.length)].map((pint, i) => (
                  <div
                    key={i}
                    className={cx(
                      styles['ChooseYourOwnStory__pint-icon'],
                      'mr2'
                    )}
                  >
                    <Image src="/assets/images/icon-pint.svg" />
                  </div>
                ))}
              </div>
            </div>
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-shipping'],
                'col flex flex-wrap items-end xs-hide sm-hide md-hide '
              )}
            >
              <label className="w100 mb2">Pick Your Ship Date</label>
              {this.props.shippingDates.map(shippingDate => (
                <Button
                  variant="primary-small"
                  color={
                    shippingDate === shipping
                      ? 'white-madison-blue'
                      : 'madison-blue-outline'
                  }
                  key={shippingDate}
                  className="small mr2"
                  label={shippingDate}
                  onClick={() => this.handleShippingDateClick(shippingDate)}
                />
              ))}
            </div>
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-add'],
                'col flex flex-wrap'
              )}
            >
              <div className="lg-hide xl-hide col col-7">
                <div className="col col-12 small bold">
                  Choose {size} Flavors
                </div>
              </div>
              <div
                className={cx(
                  styles['ChooseYourOwnStory__menu-quantity'],
                  'col col-5 md-col-6'
                )}
              >
                <QuantitySelector
                  color="madison-blue-outline"
                  quantity={quantity}
                  variant={this.state.currentBreakpoint}
                  onChange={value => this.setState({ quantity: value })}
                />
              </div>
              <div className="lg-hide xl-hide col col-5">
                <Dropdown
                  name="shipping-date"
                  className={
                    styles['ChooseYourOwnStory__menu-shipping-dropdown']
                  }
                  value={shipping}
                  color="white"
                  variant="small"
                  label="Shipping Date"
                  onChange={date => this.handleShippingDateClick(date.value)}
                  options={this.props.shippingDates.map(date => {
                    return { value: date, label: date };
                  })}
                />
              </div>
              <div className="col col-7 md-col-6 right-align">
                <Button
                  className="small"
                  disabled={size !== pints.length || !shipping}
                  variant="primary-small"
                  color="white-madison-blue"
                  onClick={this.handleAddToCart}
                >
                  <span className="mr2">Add to Cart</span>
                  <span>
                    ${getLineItemPrice(activeVariant.price, quantity)}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChooseYourOwnStory.propTypes = {
  product: Product.propTypes,
  products: PropTypes.object,
  block: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        productHandle: PropTypes.string
      })
    )
  })
};

ChooseYourOwnStory.defaultProps = {
  product: Product.default,
  products: {},
  block: {
    title: '',
    description: '',
    products: []
  }
};

export default ChooseYourOwnStory;

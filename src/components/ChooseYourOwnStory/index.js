import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import getLineItemPrice from 'utils/getLineItemPrice';
import getPintSizeFromTitle from 'utils/getPintSizeFromTitle';
import productModel from 'models/productModel';
import imageModel from 'models/imageModel';
import PintSizes from 'constants/PintSizes';
import Global from 'constants/Global';

import { Radio, Image, Button, QuantitySelector } from 'components/base';
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
      quantity: 1,
      currentBreakpoint: Global.breakpoints.small.label,
      screenHeight: 0,
      menuPosition: 'fixed'
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    window.addEventListener('scroll', this.updateMenu);
    this.updateWindow();
    this.updateMenu();
  }

  updateMenu = () => {
    if (!this.element) return null;
    const elementRect = this.element.getBoundingClientRect();
    const menuPosition =
      elementRect.bottom < window.innerHeight ? 'absolute' : 'fixed';

    if (this.state.menuPosition !== menuPosition)
      this.setState({ menuPosition });
  };

  updateWindow = () => {
    const { small, large } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= large.lowerbound ? small.label : large.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
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

    this.props.actions.addLineItems(this.props.checkout.id, items);
  };

  render() {
    const pints = get(this.state, 'pints', []);
    const size = get(this.state, 'size', PintSizes.FOUR.size);
    const quantity = get(this.state, 'quantity', 1);

    const {
      block,
      products,
      ourPledge,
      actions,
      ourPledgeOverlayIsOpen
    } = this.props;
    const fields = get(block, 'fields', {});

    const handle = get(this.props.product, 'handle', 'choose-your-own-story');
    const product = get(products, handle, {});
    const {
      overlayContentImage,
      shippingInformation,
      shippingPledge,
      calloutImage
    } = ourPledge;

    const productVariant = get(product, 'variants', []);
    const activeVariant = productVariant.find(
      variant => getPintSizeFromTitle(variant.title) === size
    );
    const activeVariantPrice = get(activeVariant, 'price', 0);
    const activeVariantId = get(activeVariant, 'id', '');

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
          className="transition-slide-up mx-auto container-width"
        />
        <div className="transition-slide-up mx-auto container-width flex flex-wrap items-start">
          <div
            className={cx(
              styles['ChooseYourOwnStory__product-cards'],
              'flex flex-wrap col-12 lg-col-6 px2'
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
              `col-12 lg-col-6`,
              {
                'z-overlay': ourPledgeOverlayIsOpen
              }
            )}
          >
            <div className="text-container-width mx-auto">
              <h1 className="block-headline mb4 relative z-1">
                {get(fields, 'title')}
              </h1>
              <div className="w100 flex my3">
                {productVariant.map(variant => (
                  <Radio
                    label={variant.title}
                    className="mr3"
                    key={variant.id}
                    checked={variant.id === activeVariantId}
                    onClick={() =>
                      this.handleSizeClick(parseInt(variant.title, 10))
                    }
                  />
                ))}
              </div>
              <div className="mb4">
                <p className="copy pr2">{get(fields, 'description', '')}</p>
              </div>
              <OurPledge
                actions={actions}
                overlayContentImage={overlayContentImage}
                shippingInformation={shippingInformation}
                shippingPledge={shippingPledge}
                calloutImage={calloutImage}
                ourPledgeOverlayIsOpen={ourPledgeOverlayIsOpen}
              />
            </div>
          </div>
        </div>
        <div
          className={cx(
            styles['ChooseYourOwnStory__menu'],
            'z-sub-nav b0 l0 w100 bg-madison-blue text-white p3 transition-slide-up-menu',
            this.state.menuPosition
          )}
        >
          <div className="flex content-width mx-auto w100">
            <div
              className={cx(
                styles['ChooseYourOwnStory__menu-size'],
                'col flex items-start xs-hide sm-hide md-hide'
              )}
            >
              {productVariant.map(variant => (
                <Radio
                  label={variant.title}
                  className="mr3 small bold"
                  key={variant.id}
                  checked={variant.id === activeVariantId}
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
              <label className="small bold">Choose {size} Flavors</label>
              <div className="flex justify-start w100 pt2">
                {pints.map((handle, i) => (
                  <div
                    key={i}
                    className={cx(
                      styles['ChooseYourOwnStory__pint-image'],
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
                styles['ChooseYourOwnStory__menu-add'],
                'col flex flex-wrap justify-end'
              )}
            >
              <div className="lg-hide xl-hide col col-7">
                <div className="col col-12">
                  <span className="small bold">Choose {size} Flavors</span>
                </div>
              </div>
              <div
                className={cx(
                  styles['ChooseYourOwnStory__menu-quantity'],
                  'col col-5'
                )}
              >
                <QuantitySelector
                  color="madison-blue-white-border"
                  quantity={quantity}
                  variant={this.state.currentBreakpoint}
                  onChange={value => this.setState({ quantity: value })}
                />
              </div>
              <div className="col">
                {product.available ? (
                  <Button
                    className="small"
                    disabled={size !== pints.length}
                    variant="primary-small"
                    color="white-madison-blue"
                    shadow={true}
                    onClick={this.handleAddToCart}
                  >
                    <span className="mr2">Add to Cart</span>
                    <span>
                      ${getLineItemPrice(activeVariantPrice, quantity)}
                    </span>
                  </Button>
                ) : (
                  <Button
                    className="small"
                    disabled={true}
                    variant="primary-small"
                    color="white-madison-blue"
                  >
                    <span className="mr2">Sold Out</span>
                    <span>
                      ${getLineItemPrice(activeVariantPrice, quantity)}
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChooseYourOwnStory.propTypes = {
  actions: PropTypes.shape({
    addLineItems: PropTypes.func,
    openOurPledge: PropTypes.func,
    closeOurPledge: PropTypes.func
  }),
  product: productModel.propTypes,
  products: PropTypes.objectOf(productModel.propTypes),
  block: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        productHandle: PropTypes.string
      })
    )
  }),
  ourPledge: PropTypes.shape({
    overlayContentImage: imageModel.propTypes,
    shippingInformation: PropTypes.string,
    shippingPledge: PropTypes.string
  })
};

ChooseYourOwnStory.defaultProps = {
  actions: {
    addLineItems: () => {},
    openOurPledge: () => {},
    closeOurPledge: () => {}
  },
  product: productModel.default,
  products: {},
  block: {
    title: '',
    description: '',
    products: []
  },
  ourPledge: {
    overlayContentImage: imageModel.default,
    shippingInformation: '',
    shippingPledge: ''
  }
};

export default ChooseYourOwnStory;

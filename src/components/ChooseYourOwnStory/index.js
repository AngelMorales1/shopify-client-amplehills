import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { v4 as uuid } from 'uuid';
import marked from 'marked';

import get from 'utils/get';
import getLineItemPrice from 'utils/getLineItemPrice';
import getPintSizeFromTitle from 'utils/getPintSizeFromTitle';
import productModel from 'models/productModel';
import PintSizes from 'constants/PintSizes';
import Global from 'constants/Global';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import makeStringifiedInventoryRequestObject from 'utils/makeStringifiedInventoryRequestObject';
import gtag from 'utils/gtag';
import cartIsMaxed from 'utils/cartIsMaxed';

import {
  PortableText,
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

    gtag('event', 'conversion', {
      send_to: 'AW-596545311/8o1BCLn1oOYBEJ-eupwC'
    });
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
    const products = get(this.props, 'products', {});

    if (pints.length !== size) return null;

    const packUuid = uuid();

    // This bundles packs together so we can limit pints in a package
    const items = pints.map((pint, i) => {
      const product = products[pint];

      return {
        variantId: get(product, 'variants[0].id'),
        quantity: 1,
        customAttributes: [
          {
            key: `__CYOS_PACK_ID__`,
            value: packUuid
          },
          {
            key: '__INVENTORY_REQUEST_DATA__',
            value: makeStringifiedInventoryRequestObject(
              pints,
              this.props.products
            )
          }
        ]
      };
    });

    const MAX_ITEMS = 2;

    const itemsAreMaxed = function(cartItems, addedItem) {
      const item = addedItem[0];
      return cartItems.find(cartItem => {
        if (cartItem.productId === item.variantId) {
          // No more than MAX_ITEMS items can be added to the cart
          return cartItem.quantity + item.quantity >= MAX_ITEMS;
        }
      });
    };

    if (
      items[0].quantity >= MAX_ITEMS ||
      itemsAreMaxed(this.props.lineItems, items)
    ) {
      this.props.actions.openCartMax();
      return null;
    }

    gtag('event', 'conversion', {
      send_to: 'AW-596545311/SAzDCOHHj-wBEJ-eupwC'
    });
    // gtag('event', 'add_to_cart', {
    //   send_to: 'AW-596545311',
    //   value: 12 * pints.length,
    //   items: items.map(item => ({
    //     id: item.variantId,
    //     google_business_vertical: 'retail'
    //   }))
    // });

    this.props.actions.addLineItems(this.props.checkout.id, items);
  };

  clearPints = () => {
    this.setState({ pints: [] });
  };

  render() {
    const pints = get(this.state, 'pints', []);
    const size = get(this.state, 'size', PintSizes.FOUR.size);
    const pintSize = Object.keys(PintSizes).find(
      pintSize => PintSizes[pintSize].size === size
    );
    const quantity = get(this.state, 'quantity', 1);

    const {
      block,
      products,
      ourPledge,
      actions,
      ourPledgeOverlayIsOpen,
      settings
    } = this.props;
    const handle = get(this.props.product, 'handle', 'build-you-own');
    const product = get(products, handle, {});
    const ourPledgeData = get(ourPledge, Object.keys(ourPledge)[0], {});

    const productVariant = get(product, 'variants', []);
    const activeVariant = productVariant.find(
      variant => getPintSizeFromTitle(variant.title) === size
    );
    const activeVariantPrice = get(activeVariant, 'price', 0);
    const activeVariantId = get(activeVariant, 'id', '');

    const shoppableProducts = Object.values(products).filter(
      product => product.availableInByo
    );
    const breadcrumbs = [
      {
        to: '/products',
        label: 'Order Online'
      },
      {
        to: '/products/build-your-own',
        label: 'Build Your Own'
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
            {shoppableProducts
              .sort((a, b) => a.order - b.order)
              .map(product => {
                return (
                  <ProductShoppableCard
                    key={product.handle}
                    product={product}
                    handleAddProduct={() =>
                      this.handleAddProduct(product.handle)
                    }
                    handleRemoveProduct={() =>
                      this.handleRemoveProduct(product.handle)
                    }
                    quantity={
                      pints.filter(pint => pint === product.handle).length
                    }
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
              <h1
                className={cx(
                  styles['ChooseYourOwnStory__title'],
                  'block-headline mb4 relative z-1'
                )}
              >
                {product.title}
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
              {/* <div
                className={cx(
                  // Temporary
                  styles['ChooseYourOwnStory__downtime'],
                  'bg-deep-yellow card detail my3'
                )}
              >
                <span className="callout-small block mb2">
                  Planned Maintenance
                </span>
                <strong>
                  Our online store is shut down for system maintenance. Don’t
                  worry, we’ll be back online in a few days (with a li’l
                  makeover!).
                </strong>
                <div
                  className={cx(
                    // Temporary
                    styles['ChooseYourOwnStory__downtime__buttons'],
                    'mt3 flex items-center'
                  )}
                >
                  <Button
                    color="peach"
                    variant="primary-small"
                    className="small mr2"
                    onClick={this.props.actions.openNewsletterModal}
                  >
                    Get Notified
                  </Button>
                  <Button
                    variant="underline-peach"
                    className="small"
                    to="/in-stores"
                  >
                    Find a Pint Near You
                  </Button>
                </div>
              </div> */}
              <div className="mb4 portable-text">
                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: marked(get(fields, 'description', ''))
                  }}
                  className="markdown-block"
                /> */}
                <PortableText blocks={product.description} />
              </div>
              <OurPledge
                actions={actions}
                ourPledgeOverlayIsOpen={ourPledgeOverlayIsOpen}
                shippingInformation={get(settings, 'ourPledgeShippingInfo', '')}
                shippingPledge={get(settings, 'ourPledgeShippingPledge', '')}
                calloutImage={get(settings, 'ourPledgeIcon.src', '')}
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
              <div>
                <label className="small bold">
                  Choose {PintSizes[pintSize].label} Flavors
                </label>
                {!!pints.length && (
                  <Button
                    variant="underline-peach"
                    className="extra-small uppercase ml2"
                    onClick={this.clearPints}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="flex justify-start w100 pt2">
                {pints.map((handle, i) => (
                  <Image
                    key={i}
                    className={cx(
                      styles['ChooseYourOwnStory__pint-icon'],
                      'mr2'
                    )}
                    src={contentfulImgUtil(
                      get(products, `[${handle}].pintImage`, ''),
                      '200',
                      'png'
                    )}
                  />
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
                  <label className="small bold">
                    Choose {PintSizes[pintSize].label} Flavors
                  </label>
                  {!!pints.length && (
                    <Button
                      variant="underline-peach"
                      className="extra-small uppercase ml2"
                      onClick={this.clearPints}
                    >
                      Clear
                    </Button>
                  )}
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
                  className="xs-hide sm-hide md-hide"
                  quantity={quantity}
                  variant={this.state.currentBreakpoint}
                  onChange={value => this.setState({ quantity: value })}
                />
                <div className="flex justify-start w100 lg-hide xl-hide">
                  {pints.map((handle, i) => (
                    <Image
                      key={i}
                      className={cx(
                        styles['ChooseYourOwnStory__pint-icon'],
                        styles['ChooseYourOwnStory__pint-icon--small'],
                        'mr1'
                      )}
                      src={contentfulImgUtil(
                        get(products, `[${handle}].pintImage`, ''),
                        '200',
                        'png'
                      )}
                    />
                  ))}
                  {[...Array(size - pints.length)].map((_, i) => (
                    <div
                      key={i}
                      className={cx(
                        styles['ChooseYourOwnStory__pint-icon'],
                        styles['ChooseYourOwnStory__pint-icon--small'],
                        'mr1'
                      )}
                    >
                      <Image src="/assets/images/icon-pint.svg" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col">
                {product.available ? (
                  <Button
                    className={cx(
                      styles['ChooseYourOwnStory__button-text'],
                      'small flex flex-row justify-between',
                      {
                        [styles['ChooseYourOwnStory__button-text--enabled']]:
                          size === pints.length
                      }
                    )}
                    disabled={size !== pints.length}
                    variant="primary-small"
                    color="white-madison-blue"
                    shadow={true}
                    onClick={this.handleAddToCart}
                  >
                    <span className="mr-auto">
                      {size !== pints.length ? 'Keep Choosing!' : 'Add to Cart'}
                    </span>
                    <span>
                      $
                      {this.state.pints
                        .reduce((total, handle) => {
                          return total + this.props.products[handle].price;
                        }, 0)
                        .toFixed(2)}
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
                      $
                      {this.state.pints
                        .reduce((total, handle) => {
                          return total + this.props.products[handle].price;
                        }, 0)
                        .toFixed(2)}
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
    openCartMaxModal: PropTypes.func,
    openOurPledge: PropTypes.func,
    closeOurPledge: PropTypes.func
  }),
  product: productModel.propTypes,
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
    closeOurPledgeOverlay: PropTypes.func,
    calloutImage: PropTypes.shape({
      data: PropTypes.string
    }),
    shippingInformation: PropTypes.string,
    shippingPledge: PropTypes.string
  })
};

ChooseYourOwnStory.defaultProps = {
  actions: {
    openCartMaxModal: () => {},
    addLineItems: () => {},
    openOurPledge: () => {},
    closeOurPledge: () => {}
  },
  product: productModel.default,
  products: null,
  block: {
    title: '',
    description: '',
    products: []
  },
  ourPledge: {
    closeOurPledgeOverlay: () => {},
    calloutImage: {
      data: ''
    },
    shippingInformation: '',
    shippingPledge: ''
  }
};

export default ChooseYourOwnStory;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import { v4 as uuid } from 'uuid';
import productModel from 'models/productModel';
import { PENDING, FULFILLED } from 'constants/Status';
import Global from 'constants/Global';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import imageModel from 'models/imageModel';
import cartIsMaxed from 'utils/cartIsMaxed';

import get from 'utils/get';
import gtag from 'utils/gtag';
import {
  Image,
  Button,
  QuantitySelector,
  Carousel,
  PortableText
} from 'components/base';
import OurPledge from 'components/OurPledge';

import styles from './ProductHero.scss';

class ProductHero extends Component {
  state = {
    quantity: 1,
    currentBreakpoint: Global.breakpoints.small.label
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.addLineItemsStatus === PENDING &&
      this.props.addLineItemsStatus === FULFILLED
    ) {
      this.didAddToCart();
    }
  }

  addToCart = () => {
    const { product, products } = this.props;

    let customAttributes = product.preOrderDate
      ? [
          {
            key: 'Shipping Estimate',
            value: product.preOrderDate
          }
        ]
      : [];

    // if (get(product, 'whatsIncluded.whatsIncludedProducts', []).length) {
    //   const pintHandles = get(
    //     product,
    //     'whatsIncluded.whatsIncludedProducts'
    //   ).map(p => get(p, 'fields.productHandle', null));
    //   customAttributes.concat([
    //     {
    //       key: '__INVENTORY_REQUEST_DATA__',
    //       value: makeStringifiedInventoryRequestObject(
    //         pintHandles,
    //         this.props.products
    //       )
    //     }
    //   ]);
    // }

    const packUuid = uuid();
    const variant = product.id;
    const items =
      product.subItems && product.subItems.length
        ? product.subItems.map(item => {
            // const foundProduct = this.props.products[item];
            return {
              quantity: this.state.quantity,
              variantId: products[item].id,
              customAttributes: {
                key: `__CYOS_PACK_ID__`,
                value: packUuid
              }
            };
          })
        : [
            {
              variantId: variant,
              quantity: this.state.quantity,
              customAttributes
            }
          ];

    if (product.headerId) {
      const headerItem = {
        quantity: this.state.quantity,
        variantId: products[product.headerId].id,
        customAttributes: {
          key: `__CYOS_PACK_ID__`,
          value: packUuid
        }
      };

      items.push(headerItem);
    }

    const MAX_ITEMS = 2;

    const itemsAreMaxed = function(cartItems, addedItem) {
      let isMaxed = false;
      cartItems.forEach(cartItem => {
        const item = addedItem[0];

        if (cartItem.productId === item.variantId) {
          // No more than MAX_ITEMS items can be added to the cart
          if (cartItem.quantity + item.quantity > MAX_ITEMS) {
            isMaxed = true;
          }
        }
      });
      return isMaxed;
    };

    if (
      items[0].quantity > MAX_ITEMS ||
      itemsAreMaxed(this.props.lineItems, items)
    ) {
      this.props.actions.openCartMax();
      return null;
    }

    gtag('event', 'add_to_cart', {
      send_to: 'AW-596545311',
      value: product.price,
      items: items.map(item => ({
        id: item.variantId,
        google_business_verical: 'retail'
      }))
    });

    this.props.actions.addLineItems(this.props.checkout.id, items);
  };

  didAddToCart = () => {
    this.setState({ quantity: 1 });
  };

  updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.lowerbound ? small.label : medium.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  render() {
    const {
      productHero: {
        productHeroAlert,
        productHeroCarouselImages,
        productHeroImage,
        productHeroTitle,
        productHeroTitleBackgroundImage,
        productHeroTitleBackgroundImagePosition
      },
      product,
      ourPledge,
      ourPledgeOverlayIsOpen,
      actions,
      settings,
      z
    } = this.props;
    const {
      available,
      subItemsAvailable,
      price,
      forceAvailable,
      title
    } = product;
    const ourPledgeData = get(ourPledge, Object.keys(ourPledge)[0], {});

    return (
      <div
        className={cx(
          styles['ProductHero'],
          'flex flex-wrap transition-slide-up'
        )}
        style={{ zIndex: z }}
      >
        {productHeroAlert ? (
          <div
            className={cx(
              styles['ProductHero__alert'],
              'absolute center inline-block mx-auto mt3 uppercase tout z-1 py1 px2'
            )}
          >
            {productHeroAlert}
          </div>
        ) : null}

        {productHeroCarouselImages.length > 1 ? (
          <div className="col col-12 md-col-6 flex square">
            <Carousel
              className={cx(styles['ProductHero__carousel'], 'wh100')}
              showArrows={false}
              showDotsOnImage={true}
              sliderClasses="h100"
            >
              {productHeroCarouselImages.map((image, i) => (
                <div
                  role="img"
                  title={`Image ${i + 1}: ${get(image, 'fields.title')}`}
                  ariaLabel={`Image ${i + 1}: ${get(image, 'fields.title')}`}
                  key={get(image, 'sys.id', i)}
                  className="wh100 square"
                  style={{
                    background: `url(${contentfulImgUtil(
                      get(image, 'fields.file.url', ''),
                      '1600'
                    )}) no-repeat center`,
                    backgroundSize: 'cover'
                  }}
                />
              ))}
            </Carousel>
          </div>
        ) : (
          <div
            className="col col-12 md-col-6 square"
            style={{
              background: `url(${
                product.heroImage.src
              }?w=1200) no-repeat center`,
              backgroundSize: 'cover'
            }}
          />
        )}
        <div className="col col-12 md-col-6 py4 flex flex-column justify-around">
          <div className="col-12 md-col-8 px3 mx-auto">
            <div className="mb4 relative inline-block">
              <h1 className={cx('block-headline', { mt3: !!productHeroAlert })}>
                {title}
              </h1>
            </div>
            <div>
              <p className="portable-text">
                <PortableText blocks={product.description} />
              </p>
            </div>
            {/* 
            <div
              className={cx(
                // Temporary
                styles['ProductHero__downtime'],
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
                  styles['ProductHero__downtime__buttons'],
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
            {product.preOrderDate ? (
              <div className="mt3 mb2">
                <strong className="text-peach bold small">
                  {product.preOrderDate}
                </strong>
              </div>
            ) : null}
            <form className="flex flex-wrap items-center justify-between">
              <QuantitySelector
                variant={
                  this.state.currentBreakpoint === 'small' ? 'small' : null
                }
                className="my3 mr1"
                quantity={this.state.quantity}
                onChange={value => this.setState({ quantity: value })}
              />
              {(available && subItemsAvailable) ||
              product.forcePreOrder ||
              (forceAvailable && available) ? (
                <div className="relative center">
                  <Button
                    className={cx(styles['ProductHero__button'], {
                      mt2: !!product.preOrderText
                    })}
                    color="madison-blue"
                    variant="primary-responsive"
                    shadow={true}
                    onClick={this.addToCart}
                  >
                    <span>
                      {product.forcePreOrder ? 'Pre-Order' : 'Add to Cart'}
                    </span>
                    <span className="ml2">
                      ${(price * this.state.quantity).toFixed(2)}
                    </span>
                  </Button>
                  {!!product.preOrderText && (
                    <strong className="mt1 extra-small text-peach">
                      {product.preOrderText}
                    </strong>
                  )}
                </div>
              ) : (
                <Button
                  className={cx(styles['ProductHero__button'])}
                  color="peach"
                  variant="primary-responsive"
                  onClick={this.addToCart}
                  disabled={true}
                >
                  <span className="mr2">Sold Out</span>
                  <span className="ml2">
                    ${(price * this.state.quantity).toFixed(2)}
                  </span>
                </Button>
              )}
            </form>
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
    );
  }
}

ProductHero.propTypes = {
  data: PropTypes.shape({}),
  z: PropTypes.number,
  product: productModel.propTypes,
  ourPledge: PropTypes.shape({
    closeOurPledgeOverlay: PropTypes.func,
    calloutImage: PropTypes.shape({
      data: PropTypes.string
    }),
    shippingInformation: PropTypes.string,
    shippingPledge: PropTypes.string
  }),
  ourPledgeOverlayIsOpen: PropTypes.bool,
  productHero: PropTypes.shape({
    productHeroAlert: PropTypes.string,
    productHeroCarouselImages: PropTypes.arrayOf(imageModel.propTypes),
    productHeroImage: PropTypes.string,
    productHeroTitle: PropTypes.string,
    productHeroTitleBackgroundImage: PropTypes.string,
    productHeroTitleBackgroundImagePosition: PropTypes.number
  })
};

ProductHero.defaultProps = {
  data: null,
  z: 1,
  product: productModel.default,
  ourPledge: {
    closeOurPledgeOverlay: () => {},
    calloutImage: {
      data: ''
    },
    shippingInformation: '',
    shippingPledge: ''
  },
  ourPledgeOverlayIsOpen: false,
  productHero: {
    productHeroAlert: '',
    productHeroCarouselImages: [],
    productHeroImage: '',
    productHeroTitle: '',
    productHeroTitleBackgroundImage: '',
    productHeroTitleBackgroundImagePosition: 0
  }
};

export default ProductHero;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import productModel from 'models/productModel';
import { PENDING, FULFILLED } from 'constants/Status';
import Global from 'constants/Global';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import get from 'utils/get';
import { Image, Button, QuantitySelector, Carousel } from 'components/base';
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
    )
      this.didAddToCart();
  }

  addToCart = () => {
    const { product } = this.props;
    const variant = product.id;
    const items = [
      {
        variantId: variant,
        quantity: this.state.quantity,
        customAttributes: product.preOrderDate
          ? [
              {
                key: 'Shipping Estimate',
                value: product.preOrderDate
              }
            ]
          : []
      }
    ];

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
      z
    } = this.props;
    const { available, subItemsAvailable, price, forceAvailable } = product;
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
          <div className="absolute center mt3 uppercase tout z-1 w100">
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
              background: `url(${contentfulImgUtil(
                productHeroImage,
                '1600'
              )}) no-repeat center`,
              backgroundSize: 'cover'
            }}
          />
        )}
        <div className="col col-12 md-col-6 py4 flex flex-column justify-around">
          <div className="col-12 md-col-8 px3 mx-auto">
            <div className="mb4 relative inline-block">
              <h1 className="block-headline">{productHeroTitle}</h1>
              <Image
                style={{
                  transform: `translateX(${productHeroTitleBackgroundImagePosition}%)`
                }}
                className={cx(
                  'absolute z-below t0 b0 my-auto',
                  styles['ProductHero__title-illustration']
                )}
                src={contentfulImgUtil(
                  productHeroTitleBackgroundImage,
                  '1000',
                  'png'
                )}
              />
            </div>
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: marked(get(product, 'description', ''))
                }}
                className="block-subheadline"
              />
            </div>
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
              product.preOrderDate ||
              (forceAvailable && available) ? (
                <div className="relative">
                  <Button
                    className={cx(styles['ProductHero__button'])}
                    color="madison-blue"
                    variant={
                      this.state.currentBreakpoint === 'small'
                        ? 'primary-small'
                        : 'primary'
                    }
                    shadow={true}
                    onClick={this.addToCart}
                  >
                    <span>
                      {product.preOrderDate ? 'Pre-Order' : 'Add to Cart'}
                    </span>
                    <span className="ml2">
                      ${(price * this.state.quantity).toFixed(2)}
                    </span>
                  </Button>
                  <div className="absolute w100 mt1 center">
                    <span
                      className={cx(styles['ProductHero__shipping'], 'bold')}
                    >
                      Shipping Included
                    </span>
                  </div>
                </div>
              ) : (
                <Button
                  color="peach"
                  variant={
                    this.state.currentBreakpoint === 'small'
                      ? 'primary-small'
                      : 'primary'
                  }
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
              shippingInformation={get(
                ourPledgeData,
                'shippingInformation',
                ''
              )}
              shippingPledge={get(ourPledgeData, 'shippingPledge', '')}
              calloutImage={get(ourPledgeData, 'calloutImage.data', '')}
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
  })
};

ProductHero.defaultProps = {
  data: {},
  z: 1,
  product: productModel.default,
  ourPledge: {
    closeOurPledgeOverlay: () => {},
    calloutImage: {
      data: ''
    },
    shippingInformation: '',
    shippingPledge: ''
  }
};

export default ProductHero;

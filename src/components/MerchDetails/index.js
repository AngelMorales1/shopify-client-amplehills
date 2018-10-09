import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import merchModel from 'models/merchModel';
import checkoutModel from 'models/checkoutModel';
import Global from 'constants/Global';

import { Button, QuantitySelector, Radio } from 'components/base';
import Breadcrumbs from 'components/Breadcrumbs';
import styles from './MerchDetails.scss';

class MerchDetails extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.small.label,
    selectedItem: '',
    quantity: 1
  };

  componentDidMount() {console.log(get(this, 'props', ''))
    const firstAvailableItem = get(this, 'props.merch.variants', '').find(
      variant => variant.available === true
    );
    this.setState({ selectedItem: firstAvailableItem.id });
    window.addEventListener('resize', this.updateWindow);

    this.updateWindow();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
    window.removeEventListener('scroll', this.updateMenu);
  }

  updateWindow = () => {
    const { small, large } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= large.lowerbound ? small.label : large.label;

    if (this.state.currentBreakpoint !== currentBreakpoint) {
      this.setState({ currentBreakpoint });
    }
  };

  addToCart = () => {
    const selectedItem = get(this, 'props.merch.variants', []).find(
      variant => variant.id === this.state.selectedItem
    );

    const item = [
      {
        variantId: get(selectedItem, 'id', ''),
        quantity: this.state.quantity,
        customAttributes: [
          {
            key: 'Item',
            value: get(selectedItem, 'title', '')
          }
        ]
      }
    ];

    this.props.actions.addLineItems(this.props.checkout.id, item);
  };

  render() {
    const merch = get(this, 'props.merch', {});
    const breadcrumbs = [{ to: '/order-online', label: 'Order Online' }];
    const images = get(merch, 'images', []);
    const selectedItem = get(merch, 'variants', []).find(
      variant => variant.id === this.state.selectedItem
    );

    return (
      <div className={cx(styles['MerchDetails'])}>
        <Breadcrumbs
          className={cx(styles['MerchDetails__breadcrumbs'])}
          breadcrumbs={breadcrumbs}
        />
        <div className={cx(styles['MerchDetails__container'], 'flex')}>
          <div
            className={cx(
              styles['MerchDetails__image'],
              'aspect-4-3 my2 col-12 md-hide lg-hide'
            )}
            style={{
              background: `url(${contentfulImgUtil(
                get(merch, 'images[0].fields.file.url', ''),
                '900'
              )}) no-repeat center`,
              backgroundSize: 'cover'
            }}
          />
          <div
            className={cx(
              styles['MerchDetails__order-container'],
              'col-12 md-col-6 my2 flex flex-column items-center'
            )}
          >
            <div className="mx-auto text-container-width">
              <h2 className="block-headline mb3">{merch.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(get(merch, 'description', ''))
                }}
                className="markdown-block"
              />
              <div className="flex flex-row flex-wrap">
                {get(merch, 'variants', []).map(variant => (
                  <Radio
                    disabled={!variant.available}
                    color={variant.available ? 'peach' : 'ghost-gray'}
                    key={variant.id}
                    checked={this.state.selectedItem === variant.id}
                    onClick={() => this.setState({ selectedItem: variant.id })}
                    className="mr3 my2 small"
                    label={variant.title}
                  />
                ))}
              </div>
              <div className="flex flex-row flex-wrap justify-between items-center mt3 mb4">
                <QuantitySelector
                  variant={
                    this.state.currentBreakpoint === 'small' ? 'small' : null
                  }
                  className="my3 mr2"
                  quantity={this.state.quantity}
                  onChange={value => this.setState({ quantity: value })}
                />
                <Button
                  className={cx(styles['MerchDetails__button'])}
                  color="madison-blue"
                  variant={
                    this.state.currentBreakpoint === 'small'
                      ? 'primary-small'
                      : 'primary'
                  }
                  shadow={true}
                  onClick={this.addToCart}
                >
                  <span>Add to Cart</span>
                  <span className="ml2">
                    ${(
                      get(selectedItem, 'price', 0.0) * this.state.quantity
                    ).toFixed(2)}
                  </span>
                </Button>
              </div>
              <p className="bold uppercase text-peach mb2">
                {merch.detailsTitle}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(get(merch, 'detailsContent', ''))
                }}
                className="markdown-block"
              />
            </div>
          </div>
          <div className="col-12 md-col-6">
            <div
              className={cx(
                styles['MerchDetails__image'],
                'aspect-4-3 my2 xs-hide sm-hide'
              )}
              style={{
                background: `url(${contentfulImgUtil(
                  get(images[0], 'fields.file.url', ''),
                  '900'
                )}) no-repeat center`,
                backgroundSize: 'cover'
              }}
            />
            {images.length > 4 ? (
              <Fragment>
                <div
                  className={cx(
                    styles['MerchDetails__image-container--divide'],
                    'w100 flex'
                  )}
                >
                  <div
                    className={cx(
                      styles['MerchDetails__image--divide'],
                      'aspect-4-3'
                    )}
                    style={{
                      background: `url(${contentfulImgUtil(
                        get(images[1], 'fields.file.url', ''),
                        '900'
                      )}) no-repeat center`,
                      backgroundSize: 'cover'
                    }}
                  />
                  <div
                    className={cx(
                      styles['MerchDetails__image--divide'],
                      'aspect-4-3'
                    )}
                    style={{
                      background: `url(${contentfulImgUtil(
                        get(images[2], 'fields.file.url', ''),
                        '900'
                      )}) no-repeat center`,
                      backgroundSize: 'cover'
                    }}
                  />
                </div>
                {images.slice(3).map((image, i) => (
                  <div
                    key={get(image, 'sys.id', i)}
                    className={cx(
                      styles['MerchDetails__image'],
                      'aspect-4-3 my2'
                    )}
                    style={{
                      background: `url(${contentfulImgUtil(
                        get(image, 'fields.file.url', ''),
                        '900'
                      )}) no-repeat center`,
                      backgroundSize: 'cover'
                    }}
                  />
                ))}
              </Fragment>
            ) : (
              <Fragment>
                {images.slice(1).map((image, i) => (
                  <div
                    key={get(image, 'sys.id', i)}
                    className={cx(
                      styles['MerchDetails__image'],
                      'aspect-4-3 my2'
                    )}
                    style={{
                      background: `url(${contentfulImgUtil(
                        get(image, 'fields.file.url', ''),
                        '900'
                      )}) no-repeat center`,
                      backgroundSize: 'cover'
                    }}
                  />
                ))}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

MerchDetails.propTypes = {
  merch: merchModel.propTypes,
  actions: PropTypes.shape({
    addLineItems: PropTypes.func
  }),
  checkout: checkoutModel.propTypes
};

MerchDetails.defaultProps = {
  merch: merchModel.default,
  actions: {
    addLineItems: () => {}
  },
  checkout: checkoutModel.default
};

export default MerchDetails;

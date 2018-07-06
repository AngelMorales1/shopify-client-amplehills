import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateLineItems,
  removeLineItems
} from 'state/actions/checkoutActions';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import getLineItemPrice from 'utils/getLineItemPrice';

import { Button, Image, QuantitySelector, TextField } from 'components/base';
import DeleteModal from 'components/DeleteModal';
import styles from './Cart.scss';

const Cart = props => {
  console.log(props);
  const updateLineItem = (item, quantity) => {
    const items = [
      {
        id: item,
        quantity
      }
    ];

    props.actions.updateLineItems(get(props, 'checkout.id', null), items);
  };
  const {
    checkout,
    actions: { removeLineItems }
  } = props;
  const items = get(checkout, 'lineItems', []);

  return (
    <div className={cx(styles['Cart'], 'flex flex-column items-center')}>
      <Button
        variant="style-none"
        className="flex flex-row items-center self-start mb4"
      >
        <Image
          className="flex justify-center mx1"
          src="/assets/images/icon-arrow-left.svg"
        />
        <span className="line-item-title text-peach">Continue Shopping</span>
      </Button>
      <h2 className="block-headline-mobile-small">Cart</h2>
      <div className={cx(styles['Cart__container'], 'w100')}>
        <div className="flex xs-hide sm-hide mt4 pt4 justify-between">
          <span className="bold">Item</span>
          <div className="flex justify-end col-8">
            <span className="bold flex justify-center col-4">Quantity</span>
            <span className="bold flex justify-end col-4">Total Price</span>
          </div>
        </div>
        <div className={cx(styles['Cart__decorative-line'], 'mt3 w100')} />
        <div className="my3">
          {items.map(item => {
            console.log(item);
            return (
              <div key={item.id}>
                <div
                  className={cx(
                    styles['Cart__content-container'],
                    'flex flex-wrap justify-between'
                  )}
                >
                  <div className="md-hide lg-hide flex justify-between w100">
                    <span className="bold my2 md-hide lg-hide">
                      {item.title}
                    </span>
                    <span className="bold small my2 md-hide lg-hide">
                      ${getLineItemPrice(
                        get(item, 'variant.price', '0.00'),
                        item.quantity
                      )}
                    </span>
                  </div>
                  <span className="bold my2 xs-hide sm-hide">{item.title}</span>
                  <div
                    className={cx(
                      styles['Cart__content-inner-wrapper'],
                      'flex items-center'
                    )}
                  >
                    <Button
                      className="my2 small-icon"
                      variant="icon"
                      onClick={() => removeLineItems(item.id)}
                    >
                      <Image src="/assets/images/icon-trash.svg" />
                    </Button>
                    <QuantitySelector
                      className={cx(styles['Cart__quantity'], 'my2')}
                      quantity={item.quantity}
                      variant="small"
                      onChange={quantity =>
                        this.updateLineItem(
                          item.id,
                          quantity,
                          get(props, 'checkout.id', null)
                        )
                      }
                    />
                  </div>
                  <span className="bold small my2 xs-hide sm-hide">
                    ${getLineItemPrice(
                      get(item, 'variant.price', '0.00'),
                      item.quantity
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx(styles['Cart__decorative-line'], ' w100')} />
        <div
          className={cx(
            styles['Cart__shipping-info'],
            'flex flex-column justify-between'
          )}
        >
          <div className={cx(styles['Cart__shipping-info__container'], 'flex')}>
            <div className="col-12 md-col-5">
              <p className="uppercase info-text-small">
                When the shipping label is created you will receive an email
                with your tracking number.
              </p>
            </div>
            <div
              className={cx(
                styles['Cart__shipping-info__checkout'],
                'col-12 md-col-4'
              )}
            >
              <p
                className={cx(
                  styles['Cart__shipping-info__tax'],
                  'uppercase info-text-small flex items-center col-6 md-col-12'
                )}
              >
                Shipping & taxes calculated at checkout
              </p>
              <div
                className={cx(
                  styles['Cart__shipping-info-total'],
                  'flex justify-between'
                )}
              >
                <p className="price-text flex items-center">{`Subtotal: $${
                  checkout.subtotalPrice
                }`}</p>

                <div className="my1 md-col-4 md-hide lg-hide">
                  <Button
                    className="flex items-center justify-center"
                    label="Checkout"
                    color="madison-blue"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={cx(
              styles['Cart__message-checkout-container'],
              'flex flex-row justify-between'
            )}
          >
            <div className="col-12 md-col-6">
              <h2 className="sub-title mt2 mb3">Gift Message</h2>
              <TextField
                className="mb2 md-hide lg-hide"
                variant="light-gray"
                placeholder={`Write a message`}
              />
              <TextField
                className="mb2 xs-hide sm-hide"
                variant="light-gray-tall"
                multiLine={true}
                placeholder={`Write a message`}
              />
              <span className="uppercase info-text-small">
                Gift messages will not include prices
              </span>
              <div
                className={cx(
                  styles['Cart__decorative-line'],
                  'mt3 md-hide lg-hide w100'
                )}
              />
            </div>
            <div className="my1 md-col-4 xs-hide sm-hide">
              <Button
                className="flex items-center justify-center"
                label="Checkout"
                color="madison-blue"
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteModal />
    </div>
  );
};

Cart.propTypes = {
  actions: PropTypes.shape({
    removeLineItems: PropTypes.func,
    updateLineItems: PropTypes.func
  }),
  checkout: PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.string,
        quantity: PropTypes.number
      })
    )
  })
};

Cart.defaultProps = {
  actions: {
    removeLineItems: () => {},
    updateLineItems: () => {}
  },
  checkout: {
    id: '',
    items: [
      {
        id: '',
        title: '',
        quantity: 1
      }
    ]
  }
};

const mapStateToProps = state => {
  return {
    ...state,
    checkout: get(state, 'session.checkout', {}),
    lineItemsBeingUpdated: get(state, 'status.lineItemsBeingUpdated', []),
    lineItemsBeingRemoved: get(state, 'status.lineItemsBeingRemoved', [])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        removeLineItems,
        updateLineItems
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

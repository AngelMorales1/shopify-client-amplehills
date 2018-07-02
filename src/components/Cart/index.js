import React, { Component } from 'react';
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

class Cart extends Component {
  updateLineItem = (item, quantity) => {
    const items = [
      {
        id: item,
        quantity
      }
    ];

    this.props.actions.updateLineItems(
      get(this.props, 'checkout.id', null),
      items
    );
  };

  render() {
    const {
      checkout,
      actions: { removeLineItems }
    } = this.props;
    const items = get(checkout, 'lineItems', []);
    return (
      <div className={cx(styles['Cart'], 'flex flex-column items-center')}>
        <h2 className="block-headline-mobile-small">Cart</h2>
        <div
          className={cx(
            styles['Cart__content-title__container'],
            'xs-hide sm-hide mt4 pt4'
          )}
        >
          <span
            className={cx(
              styles['Cart__content-title-item'],
              'bold flex justify-start'
            )}
          >
            Item
          </span>
          <span
            className={cx(
              styles['Cart__content-title-quantity'],
              'bold flex justify-center'
            )}
          >
            Quantity
          </span>
          <span
            className={cx(
              styles['Cart__content-title-total-price'],
              'bold flex justify-end'
            )}
          >
            Total Price
          </span>
        </div>
        <div className={cx(styles['Cart__decorative-line'], 'mt3')} />
        <div className="my3">
          {items.map(item => {
            return (
              <div
                className={cx(styles['Cart__content-info__container'])}
                key={item.id}
              >
                <div className={cx(styles['Cart__content-info__item'])}>
                  <span className="bold my2">{item.title}</span>
                </div>
                <div className={cx(styles['Cart__content-info__price'])}>
                  <span className="bold small">
                    ${getLineItemPrice(
                      get(item, 'variant.price', '0.00'),
                      item.quantity
                    )}
                  </span>
                </div>
                <div className={cx(styles['Cart__content-info__quantity'])}>
                  <QuantitySelector
                    quantity={item.quantity}
                    variant="small"
                    onChange={quantity =>
                      this.updateLineItem(
                        item.id,
                        quantity,
                        get(this.props, 'checkout.id', null)
                      )
                    }
                  />
                </div>
                <div className={cx(styles['Cart__content-info__delete'])}>
                  <Button
                    variant="icon"
                    onClick={() => removeLineItems(item.id)}
                  >
                    <Image src="/assets/images/icon-trash.svg" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx(styles['Cart__decorative-line'])} />

        <div className={cx(styles['Cart__shipping-info__container'], 'mt4')}>
          <div className={cx(styles['Cart__shipping-info__delivery-info'])}>
            <p className="uppercase info-text-small">
              When the shipping label is created you will receive an email with
              your tracking number.
            </p>
          </div>
          <div className={cx(styles['Cart__shipping-info__total'])}>
            <div className={cx(styles['Cart__mobile-position'])}>
              <p className="uppercase info-text-small flex items-center">
                Shipping & taxes calculated at checkout
              </p>
              <p className="price-text my1 flex items-center">{`Subtotal: $${
                checkout.subtotalPrice
              }`}</p>
            </div>
          </div>

          <div className={cx(styles['Cart__shipping-info__gift-message'])}>
            <h2 className="sub-title mt2 mb3">Gift Message</h2>
            <TextField
              className="mb2"
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
                'mt3 md-hide lg-hide'
              )}
            />
          </div>
          <div className={cx(styles['Cart__shipping-info__buttons'], 'my1')}>
            <div className={cx(styles['Cart__mobile-position'])}>
              <Button
                className="flex items-center justify-center"
                label="Checkout"
                color="madison-blue"
              />
            </div>
          </div>
        </div>
        <DeleteModal />
      </div>
    );
  }
}

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

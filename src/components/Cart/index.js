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
        <h2 className="block-headline">Cart</h2>
        <div
          className={cx(
            styles['Cart__content-title__container'],
            'xs-hide sm-hide my2'
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
        <div
          className={cx(styles['Cart__decorative-line'], 'xs-hide sm-hide')}
        />
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
        <div
          className={cx(styles['Cart__decorative-line'], 'xs-hide sm-hide')}
        />

        <div className={cx(styles['Cart__shipping-info__container'], 'mt4')}>
          <div className={cx(styles['Cart__shipping-info__delivery-info'])}>
            <p className="info-text-uppercase">
              An Item you ordered has shipping limitations that will be selected
              in checkout
            </p>
          </div>
          <div className={cx(styles['Cart__shipping-info__total'])}>
            <div>
              <p className="info-text-uppercase xs-hide sm-hide">
                Shipping & taxes calculated at checkout
              </p>
              <p className="price-text my1">{`Subtotal: $${
                checkout.subtotalPrice
              }`}</p>
            </div>
          </div>

          <div
            className={cx(
              styles['Cart__shipping-info__gift-message'],
              'xs-hide sm-hide'
            )}
          >
            <h2 className="sub-title ml1 mt2 mb3">Gift Message</h2>
            <TextField
              className="ml1 mb2"
              variant="light-gray-tall"
              placeholder="Message"
              multiLine={true}
              placeholder={`Message (don't forget to include your name)`}
            />
            <span className="info-text-uppercase ml1 xs-hide sm-hide">
              Gift messages will not include prices
            </span>
          </div>
          <div className={cx(styles['Cart__shipping-info__buttons'], 'my1')}>
            <div>
              <Button
                className="xs-hide sm-hide"
                label="Update Cart"
                color="peach"
              />
              <Button label="Checkout" color="madison-blue" />
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

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
import updateLineItem from 'utils/updateLineItem';
import getLineItemPrice from 'utils/getLineItemPrice';

import { Button, Image, QuantitySelector } from 'components/base';
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
    console.log(this.props, '??');
    const {
      checkout,
      actions: { removeLineItems }
    } = this.props;
    const items = get(checkout, 'lineItems', []);

    return (
      <div>
        Cart
        <div>
          <p>Item</p>
          <p>Quantity</p>
          <p>Total Price</p>
        </div>
        <div>
          <p>item</p>
          {items.map(item => {
            const classes = cx('mb2', {
              [styles['MiniCart__line-item--updating']]:
                this.props.lineItemsBeingUpdated.includes(
                  get(item, 'id', '')
                ) ||
                this.props.lineItemsBeingRemoved.includes(get(item, 'id', ''))
            });

            return (
              <div className={classes} key={item.id}>
                <div>
                  <span>{item.title}</span>
                  <span>
                    ${getLineItemPrice(
                      get(item, 'variant.price', '0.00'),
                      item.quantity
                    )}
                  </span>
                </div>
                <div>
                  <QuantitySelector
                    quantity={item.quantity}
                    variant="small"
                    onChange={quantity => updateLineItem(item.id, quantity)}
                  />
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
          <p>
            An Item you ordered has shipping limitations that will be selected
            in checkout
          </p>
          <p>Shipping & taxes calculated at checkout</p>
          <p>{`Subtotal: $${checkout.subtotalPrice}`}</p>
        </div>
        <DeleteModal />
      </div>
    );
  }
}

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

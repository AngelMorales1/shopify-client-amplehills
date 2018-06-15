import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeCart } from 'state/actions/ui/cartUIActions';
import {
  removeLineItems,
  updateLineItems
} from 'state/actions/checkoutActions';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { Button, QuantitySelector } from 'components/base';
import styles from './Cart.scss';

class Cart extends Component {
  removeLineItem = item => {
    const items = [item];

    this.props.actions.removeLineItems(
      get(this.props, 'checkout.id', null),
      items
    );
  };

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
    console.log(this.props);
    const {
      checkout,
      actions: { closeCart }
    } = this.props;

    const classes = cx(styles['Cart'], 'fixed z-nav p3 bg-white', {
      [styles['Cart--open']]: this.props.cartIsOpen
    });

    const items = get(checkout, 'lineItems', []);

    return (
      <div className={classes}>
        <div className="mb2">
          <strong className="callout">Cart</strong>
        </div>

        <div className="mb4">
          {items.map(item => {
            console.log(
              this.props.lineItemsBeingUpdated.includes(get(item, 'id', '')),
              this.props.lineItemsBeingUpdated
            );
            const classes = cx(styles['Cart__line-item'], 'mb2', {
              [styles[
                'Cart__line-item--updating'
              ]]: this.props.lineItemsBeingUpdated.includes(get(item, 'id', ''))
            });

            return (
              <div className={classes} key={item.id}>
                <div className="mb1">
                  <span className="mr2">{item.title}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
                <div className="w100 flex justify-between">
                  <Button
                    variant="text"
                    onClick={() => this.removeLineItem(item.id)}
                    label="remove"
                  />
                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={quantity =>
                      this.updateLineItem(item.id, quantity)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb2">
          <Button onClick={() => closeCart()} label="close" />
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  actions: PropTypes.shape({
    closeCart: PropTypes.func,
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
  }),
  cartIsOpen: PropTypes.bool,
  lineItemsBeingUpdated: PropTypes.arrayOf(PropTypes.string)
};

Cart.defaultProps = {
  actions: {
    closeCart: () => {},
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
  },
  cartIsOpen: false
};

const mapStateToProps = state => {
  return {
    ...state,
    cartIsOpen: get(state, 'cartUI.cartIsOpen', false),
    checkout: get(state, 'session.checkout', {}),
    lineItemsBeingUpdated: get(state, 'status.lineItemsBeingUpdated', [])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        closeCart,
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

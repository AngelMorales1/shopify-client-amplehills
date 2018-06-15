import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeCart } from 'state/actions/ui/cartUIActions';
import { removeLineItems } from 'state/actions/checkoutActions';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { Button } from 'components/base';
import styles from './Cart.scss';

class Cart extends Component {
  removeLineItem = item => {
    const items = [item];

    this.props.actions.removeLineItems(
      get(this.props, 'checkout.id', null),
      items
    );
  };

  render() {
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
          {items.map(item => (
            <div className="mb2" key={item.id}>
              <div className="mb1">
                <span className="mr2">{item.title}</span>
                <span>Qty: {item.quantity}</span>
              </div>
              <div className="w100">
                <Button
                  variant="text"
                  onClick={() => this.removeLineItem(item.id)}
                  label="remove"
                />
              </div>
            </div>
          ))}
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
    closeCart: PropTypes.func
  }),
  cartIsOpen: PropTypes.bool
};

Cart.defaultProps = {
  actions: {
    closeCart: () => {},
    removeLineItems: () => {}
  },
  cartIsOpen: false
};

const mapStateToProps = state => {
  return {
    ...state,
    cartIsOpen: get(state, 'cartUI.cartIsOpen'),
    checkout: get(state, 'session.checkout')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        closeCart,
        removeLineItems
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openCart, closeCart } from 'state/actions/ui/cartUIActions';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { Button } from 'components/base';
import styles from './Cart.scss';

class Cart extends Component {
  render() {
    const {
      actions: { openCart, closeCart }
    } = this.props;
    const classes = cx(styles['Cart'], 'fixed p3', {
      [styles['Cart--open']]: this.props.cartIsOpen
    });

    return (
      <div className={classes}>
        <span>Cart</span>
        <Button onClick={() => closeCart()} label="close" />
      </div>
    );
  }
}

Cart.propTypes = {
  actions: PropTypes.shape({
    openCart: PropTypes.func,
    closeCart: PropTypes.func
  }),
  cartIsOpen: PropTypes.bool
};

Cart.defaultProps = {
  actions: {
    openCart: () => {},
    closeCart: () => {}
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
        openCart,
        closeCart
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

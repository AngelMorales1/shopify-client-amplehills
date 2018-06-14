import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Cart.scss';

class Cart extends Component {
  render() {
    const classes = cx(styles['Cart'], 'fixed p3', {
      [styles['Cart--open']]: this.props.isCartOpen
    });

    return (
      <div className={classes}>
        <span>Cart</span>
      </div>
    );
  }
}

Cart.propTypes = {
  isCartOpen: PropTypes.bool
};

Cart.defaultProps = {
  isCartOpen: false
};

export default Cart;

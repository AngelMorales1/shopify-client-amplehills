import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openCart, closeCart } from 'state/actions/ui/cartUIActions';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { NavLink } from 'react-router-dom';
import { Image, Button } from 'components/base';
import styles from './Nav.scss';

class Nav extends Component {
  toggleCart = () => {
    const {
      actions: { openCart, closeCart }
    } = this.props;

    return this.props.isCartOpen ? closeCart() : openCart();
  };

  render() {
    return (
      <div className="my3 px4 flex items-center clearfix">
        <div className={`col col-4 flex justify-start ${styles['left-side']}`}>
          <NavLink exact to="/location" className="ml4 link-text">
            Location
          </NavLink>
          <NavLink exact to="/contact" className="ml4 link-text">
            Contact
          </NavLink>
        </div>
        <div className="col col-4 flex justify-center items-center">
          <NavLink exact to="/" className="justify-center">
            <Image
              alt="Click the Ample Hills Logo to return to the homepage"
              src="/assets/images/ample-hills-logo.svg"
            />
          </NavLink>
        </div>
        <div
          className={`col col-4 flex items-center justify-end clearfix ${
            styles['right-side']
          }`}
        >
          <NavLink exact to="/profile" className="mr4 link-text">
            Profile
          </NavLink>
          <NavLink exact to="/collections" className="mr4 link-text">
            Collections
          </NavLink>
          <Button
            to="/products"
            variant="secondary"
            color="peach"
            label="Shop Online"
          />
          <Button onClick={this.toggleCart} label="Cart" />
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  actions: PropTypes.shape({
    openCart: PropTypes.func,
    closeCart: PropTypes.func
  }),
  isCartOpen: PropTypes.bool
};

Nav.defaultProps = {
  actions: {
    openCart: () => {},
    closeCart: () => {}
  },
  isCartOpen: false
};

const mapStateToProps = state => {
  return {
    ...state,
    isCartOpen: get(state, 'cartUI.isCartOpen')
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
)(Nav);

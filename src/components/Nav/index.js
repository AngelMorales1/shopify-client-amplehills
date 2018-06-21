import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  openMiniCart,
  closeMiniCart
} from 'state/actions/ui/miniCartUIActions';

import PropTypes from 'prop-types';
import get from 'utils/get';

import { NavLink } from 'react-router-dom';
import { Image, Button } from 'components/base';
import styles from './Nav.scss';

class Nav extends Component {
  toggleMiniCart = () => {
    const {
      miniCartIsOpen,
      checkout,
      actions: { openMiniCart, closeMiniCart }
    } = this.props;

    return miniCartIsOpen ? closeMiniCart() : openMiniCart();
  };

  render() {
    return (
      <div className="py2 px4 flex bg-peach text-white items-center clearfix">
        <div className={`col col-4 flex justify-start ${styles['left-side']}`}>
          <NavLink exact to="/location" className="ml3 link-text">
            Locations
          </NavLink>
          <NavLink exact to="/contact" className="ml3 link-text">
            Contact
          </NavLink>
        </div>
        <div className="col col-4 h100 flex justify-center items-center">
          <NavLink exact to="/" className="flex justify-center items-center">
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
          <NavLink exact to="/profile" className="mr3 link-text">
            <Image src="/assets/images/bubble-icon.svg" />
          </NavLink>
          <Button
            to="/products"
            variant="primary-small"
            color="white-peach"
            label="Shop Online"
          />
          <Button
            className="ml2 small"
            variant="circle"
            color="madison-blue"
            onClick={this.toggleMiniCart}
            label={get(this.props.checkout, 'lineItems.length', 0)}
          />
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  actions: PropTypes.shape({
    openMiniCart: PropTypes.func,
    closeMiniCart: PropTypes.func
  }),
  miniCartIsOpen: PropTypes.bool
};

Nav.defaultProps = {
  actions: {
    openMiniCart: () => {},
    closeMiniCart: () => {}
  },
  miniCartIsOpen: false
};

const mapStateToProps = state => {
  return {
    ...state,
    miniCartIsOpen: get(state, 'miniCartUI.miniCartIsOpen'),
    checkout: get(state, 'sessions.checkout')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        openMiniCart,
        closeMiniCart
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);

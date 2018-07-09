import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import totalItems from 'state/selectors/totalItems';
import {
  openMiniCart,
  closeMiniCart
} from 'state/actions/ui/miniCartUIActions';

import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';

import { NavLink } from 'react-router-dom';
import { Image, Button } from 'components/base';
import styles from './Nav.scss';

class Nav extends Component {
  toggleMiniCart = () => {
    const {
      miniCartIsOpen,
      actions: { openMiniCart, closeMiniCart }
    } = this.props;

    return miniCartIsOpen ? closeMiniCart() : openMiniCart();
  };

  render() {
    return (
      <div
        className={cx(
          styles['Nav'],
          'flex bg-peach text-white items-center clearfix'
        )}
      >
        <div
          className={`col col-4 flex justify-start items-center xs-hide sm-hide ${
            styles['Nav__left-side']
          }`}
        >
          <NavLink exact to="/location" className="ml3 link-text center">
            Locations
          </NavLink>
          <NavLink exact to="/flavors" className="ml3 link-text center">
            Flavors
          </NavLink>
          <NavLink exact to="/events" className="ml3 link-text center">
            Events
          </NavLink>
          <NavLink exact to="/classes-socials" className="ml3 link-text center">
            Classes &amp; Socials
          </NavLink>
          <NavLink exact to="/parties" className="ml3 link-text center">
            Parties
          </NavLink>
        </div>
        <div className="md-hide lg-hide">
          <NavLink exact to="/menu" className="ml3 link-text center">
            <div className={cx(styles['Nav__menu-icon-container'])}>
              <div className={cx(styles['Nav__menu-icon'])} />
              <div className={cx(styles['Nav__menu-icon'])} />
              <div className={cx(styles['Nav__menu-icon'])} />
            </div>
          </NavLink>
        </div>
        <div className="col mx-auto h100 flex justify-center items-center">
          <NavLink exact to="/" className="flex justify-center items-center">
            <Image
              alt="Click the Ample Hills Logo to return to the homepage"
              src="/assets/images/ample-hills-logo.svg"
            />
          </NavLink>
        </div>
        <div
          className={`col col-4 flex items-center justify-end clearfix xs-hide sm-hide ${
            styles['right-side']
          }`}
        >
          <NavLink exact to="/outstory" className="mr3 link-text center">
            Our Story
          </NavLink>
          <NavLink exact to="/profile" className="mr3 link-text center">
            <Image src="/assets/images/icon-search.svg" />
          </NavLink>
          <NavLink exact to="/profile" className="mr3 link-text center">
            <Image src="/assets/images/bubble-icon.svg" />
          </NavLink>
          <Button
            to="/products"
            variant="primary-small"
            color="white-peach"
            label="Shop Online"
          />
          <Button
            className="ml2 small flex items-center justify-center"
            variant="circle"
            color="madison-blue"
            to="/cart"
            label={this.props.totalItems.toString()}
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
    totalItems: totalItems(state)
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

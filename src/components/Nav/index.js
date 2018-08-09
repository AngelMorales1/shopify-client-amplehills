import React, { Component, Fragment } from 'react';
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
import Global from 'constants/Global';

import { NavLink } from 'react-router-dom';
import { Image, Button } from 'components/base';
import styles from './Nav.scss';

class Nav extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.medium.label
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
  }

  updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.lowerbound ? small.label : medium.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

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
          'z-nav w100 fixed t0 l0 flex bg-peach text-white items-center transition-fade-in-color'
        )}
      >
        <div
          className={`col col-4 md-col-5 flex items-center ${
            styles['left-side']
          }`}
        >
          <NavLink exact to="/locations" className="link-text center">
            Locations
          </NavLink>
          <NavLink
            exact
            to="/contact"
            className="ml3 link-text center xs-hide sm-hide"
          >
            Contact
          </NavLink>
        </div>
        <div
          className={cx(
            styles['logo-container'],
            'col col-3 md-col-4 h100 flex items-center'
          )}
        >
          <NavLink exact to="/" className="flex justify-center">
            <Image
              className="col-12 md-col-10"
              alt="Click the Ample Hills Logo to return to the homepage"
              src="/assets/images/ample-hills-logo.svg"
            />
          </NavLink>
        </div>
        <div className={`col col-5 flex items-center ${styles['right-side']}`}>
          {this.state.currentBreakpoint === 'medium' ? (
            <Fragment>
              <NavLink exact to="/profile" className="mr3 link-text center">
                <Image className="icon" src="/assets/images/bubble-icon.svg" />
              </NavLink>
              <Button
                className="mr3"
                to="/products"
                variant="primary-small"
                color="white-peach"
                label="Shop Online"
              />
            </Fragment>
          ) : (
            <Fragment>
              <NavLink exact to="/products" className="link-text center">
                Shop
              </NavLink>
              <NavLink exact to="/profile" className="link-text center">
                <Image src="/assets/images/icon-profile.svg" />
              </NavLink>
            </Fragment>
          )}
          <Button
            className={cx(
              styles['Nav__cart-button'],
              'small flex items-center justify-center'
            )}
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

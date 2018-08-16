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
import imageModel from 'models/imageModel';

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
    const { logo, profileIcon } = this.props;

    return (
      <div
        className={cx(
          styles['Nav'],
          this.props.alertIsActive ? null : 't0',
          'z-nav w100 fixed l0 flex bg-peach text-white items-center transition-fade-in'
        )}
      >
        <div
          className={`col col-4 md-col-5 flex items-center ${
            styles['left-side']
          }`}
        >
          <NavLink
            exact
            to="/locations"
            className="link-text center text-hover"
          >
            Locations
          </NavLink>
          <NavLink
            exact
            to="/contact"
            className="text-hover ml3 link-text center xs-hide sm-hide"
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
              className={cx(styles['logo-container__logo'], 'col-12 md-col-10')}
              alt="Click the Ample Hills Logo to return to the homepage"
              src={get(logo, 'fields.file.url', '')}
            />
          </NavLink>
        </div>
        <div className={`col col-5 flex items-center ${styles['right-side']}`}>
          {this.state.currentBreakpoint === 'medium' ? (
            <Fragment>
              <NavLink exact to="/profile" className="mr2 link-text center">
                <Image
                  className="icon"
                  src={get(profileIcon, 'fields.file.url', '')}
                />
              </NavLink>
              <Button
                className="mr2"
                to="/products"
                variant="primary-small"
                color="white-peach"
                label="Shop Online"
                hover="clear-white-border"
              />
            </Fragment>
          ) : (
            <Fragment>
              <NavLink
                exact
                to="/products"
                className="text-hover link-text center"
              >
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
            hover="clear-white-border"
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
  miniCartIsOpen: PropTypes.bool,
  logo: imageModel.propTypes,
  profileIcon: imageModel.propTypes
};

Nav.defaultProps = {
  actions: {
    openMiniCart: () => {},
    closeMiniCart: () => {}
  },
  miniCartIsOpen: false,
  logo: imageModel.default,
  profileIcon: imageModel.default
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

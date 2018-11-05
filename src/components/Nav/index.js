import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import totalItems from 'state/selectors/totalItems';
import {
  openMiniCart,
  closeMiniCart
} from 'state/actions/ui/miniCartUIActions';
import {
  openMobileNav,
  closeMobileNav
} from 'state/actions/ui/mobileNavUIActions';
import {
  openShopOnline,
  closeShopOnline
} from 'state/actions/ui/dropdownNavUIActions';
import alertIsActive from 'state/selectors/alertIsActive';

import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import Global from 'constants/Global';
import imageModel from 'models/imageModel';
import ShopOnlineNavDropdown from 'components/ShopOnlineNavDropdown';

import { NavLink } from 'react-router-dom';
import { Image, Button } from 'components/base';
import styles from './Nav.scss';

class Nav extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.medium.label,
    mobileNavIsOpen: false
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
  }

  updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.upperbound ? small.label : medium.label;

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

  toggleMobileNav = () => {
    const {
      mobileNavIsOpen,
      actions: { openMobileNav, closeMobileNav }
    } = this.props;

    return mobileNavIsOpen ? closeMobileNav() : openMobileNav();
  };

  render() {
    const {
      logo,
      profileIcon,
      productLanding,
      alertIsActive,
      shopOnlineDropdownIsOpen
    } = this.props;
    const { openShopOnline, closeShopOnline } = this.props.actions;
    const { medium } = Global.breakpoints;
    const cartIsEmpty = this.props.totalItems === 0;

    return (
      <div className="w100">
        <div
          className={cx(
            styles['Nav'],
            this.props.alertIsActive ? null : 't0',
            'z-nav w100 fixed l0 flex bg-peach text-white items-center transition-fade-in'
          )}
        >
          <div className="col col-4 md-col-5 flex items-center justify-start">
            {this.state.currentBreakpoint === medium.label ? (
              <Fragment>
                <NavLink
                  exact
                  to="/locations"
                  className="link-text center text-hover"
                >
                  Locations
                </NavLink>
                <NavLink
                  exact
                  to="/flavors"
                  className="text-hover ml3 link-text center xs-hide sm-hide"
                >
                  Flavors
                </NavLink>
                <NavLink
                  exact
                  to="/events"
                  className="text-hover ml3 link-text center xs-hide sm-hide"
                >
                  Events
                </NavLink>
                <NavLink
                  exact
                  to="/classes-and-socials"
                  className="text-hover ml3 link-text center xs-hide sm-hide"
                >
                  Classes & Socials
                </NavLink>
                <NavLink
                  exact
                  to="/parties"
                  className="text-hover ml3 link-text center xs-hide sm-hide"
                >
                  Parties
                </NavLink>
              </Fragment>
            ) : (
              <Button
                variant="style-none"
                onClick={() => this.toggleMobileNav()}
              >
                <Image
                  alt="menu icon"
                  src="/assets/images/icon-mobile-menu.svg"
                />
              </Button>
            )}
          </div>
          <div
            className={cx(
              styles['logo-container'],
              'col col-4 md-col-4 h100 flex items-center'
            )}
          >
            <NavLink exact to="/" className="flex justify-center">
              <Image
                className={cx(
                  styles['logo-container__logo'],
                  'col-12 md-col-10'
                )}
                alt="Click the Ample Hills Logo to return to the homepage"
                src={contentfulImgUtil(
                  get(logo, 'fields.file.url', ''),
                  '500',
                  'png'
                )}
              />
            </NavLink>
          </div>
          <div className="col col-4 md-col-5 flex items-center justify-end">
            {this.state.currentBreakpoint === 'medium' ? (
              <Fragment>
                <NavLink
                  exact
                  to="/our-story"
                  className="text-hover link-text center mr2"
                >
                  Our Story
                </NavLink>
                <NavLink exact to="/profile" className="mr2 link-text center">
                  <Image
                    className="icon"
                    src={contentfulImgUtil(
                      get(
                        profileIcon,
                        'fields.file.url',
                        '/assets/images/bubble-icon.svg'
                      ),
                      '200',
                      'png'
                    )}
                  />
                </NavLink>
                <Button
                  className="mr2"
                  to="/products"
                  variant="primary-small"
                  color="white-peach"
                  label="Shop Online"
                  onClick={closeShopOnline}
                  onMouseEnter={openShopOnline}
                  hover="clear-white-border"
                />
              </Fragment>
            ) : (
              <Fragment>
                <NavLink exact to="/profile" className="link-text center mx2">
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
              color={cartIsEmpty ? 'burgundy' : 'madison-blue'}
              to="/cart"
              label={this.props.totalItems.toString()}
              hover="clear-white-border"
            />
          </div>
        </div>
        {this.state.currentBreakpoint === medium.label ? (
          <ShopOnlineNavDropdown
            shopOnlineDropdownIsOpen={shopOnlineDropdownIsOpen}
            productLanding={productLanding}
            alertIsActive={alertIsActive}
            openShopOnline={openShopOnline}
            closeShopOnline={closeShopOnline}
          />
        ) : null}
      </div>
    );
  }
}

Nav.propTypes = {
  actions: PropTypes.shape({
    openMiniCart: PropTypes.func,
    closeMiniCart: PropTypes.func,
    openMobileNav: PropTypes.func,
    closeMobileNav: PropTypes.func,
    openShopOnline: PropTypes.func,
    closeShopOnline: PropTypes.func
  }),
  miniCartIsOpen: PropTypes.bool,
  mobileNavIsOpen: PropTypes.bool,
  logo: imageModel.propTypes,
  profileIcon: imageModel.propTypes
};

Nav.defaultProps = {
  actions: {
    openMiniCart: () => {},
    closeMiniCart: () => {},
    openMobileNav: () => {},
    closeMobileNav: () => {},
    openShopOnline: () => {},
    closeShopOnline: () => {}
  },
  miniCartIsOpen: false,
  mobileNavIsOpen: false,
  logo: imageModel.default,
  profileIcon: null
};

const mapStateToProps = state => {
  return {
    ...state,
    miniCartIsOpen: get(state, 'miniCartUI.miniCartIsOpen'),
    mobileNavIsOpen: get(state, 'mobileNavUI.mobileNavIsOpen'),
    shopOnlineDropdownIsOpen: get(state, 'dropdownNavUI.shopOnlineIsOpen'),
    totalItems: totalItems(state),
    productLanding: get(
      state,
      'applicationUI.globalSettings.items[0].fields.productLanding.fields',
      {}
    ),
    alertIsActive: alertIsActive(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        openMiniCart,
        closeMiniCart,
        openMobileNav,
        closeMobileNav,
        openShopOnline,
        closeShopOnline
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);

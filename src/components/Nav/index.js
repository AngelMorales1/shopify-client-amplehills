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
  openShopDropdown,
  closeShopDropdown,
  openLocationDropdown,
  closeLocationDropdown
} from 'state/actions/ui/dropdownNavUIActions';
import alertIsActive from 'state/selectors/alertIsActive';
import lineItems from 'state/selectors/lineItems';
import products from 'state/selectors/products';
import {
  FARTHER_FROM_BROOKLYN,
  FARTHEST_FROM_BROOKLYN,
  BROOKLYN
} from 'constants/LocationGroups';

import PropTypes from 'prop-types';
import get from 'utils/get';
import sortLocationsByGroup from 'utils/sortLocationsByGroup';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import Global from 'constants/Global';
import imageModel from 'models/imageModel';
import ShopDropdown from 'components/ShopDropdown';
import LocationDropdown from 'components/LocationDropdown';
import locations from 'state/selectors/locations';

import { NavLink } from 'react-router-dom';
import { Image, Button } from 'components/base';
import styles from './Nav.scss';

class Nav extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.medium.label,
    mobileNavIsOpen: false,
    locationSortedByGroup: {
      [BROOKLYN]: {},
      [FARTHER_FROM_BROOKLYN]: {},
      [FARTHEST_FROM_BROOKLYN]: {}
    },
    regionOrder: {
      fartherOrder: [],
      farthestOrder: []
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();

    const locations = get(this, 'props.locations', []);
    const sortedLocation = sortLocationsByGroup(locations);

    this.setState({
      locationSortedByGroup: sortedLocation.locationSortedByGroup,
      regionOrder: sortedLocation.regionOrder
    });
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

  startDropdownTimer = buttonName => {
    const { actions } = this.props;

    if (buttonName === 'locations') {
      this.cancelDropdownTimer('locations');
      this.locationDropdownTimer = setTimeout(() => {
        actions.closeShopDropdown();
        actions.openLocationDropdown();
      }, 250);
    }

    if (buttonName === 'shop') {
      this.cancelDropdownTimer('shop');
      this.shopDropdownTimer = setTimeout(() => {
        actions.closeLocationDropdown();
        actions.openShopDropdown();
      }, 250);
    }
  };

  cancelDropdownTimer = buttonName => {
    if (buttonName === 'locations') {
      clearTimeout(this.locationDropdownTimer);
    }

    if (buttonName === 'shop') {
      clearTimeout(this.shopDropdownTimer);
    }
  };

  render() {
    const {
      logo,
      profileIcon,
      productLanding,
      alertIsActive,
      shopDropdownIsOpen,
      locationDropdownIsOpen,
      locationDropdownImage,
      products,
      settings
    } = this.props;
    const {
      openShopDropdown,
      closeShopDropdown,
      openLocationDropdown,
      closeLocationDropdown
    } = this.props.actions;
    const { medium } = Global.breakpoints;

    const filteredItems = this.props.lineItems.filter(
      item => item.product.handle !== item.product.headerId
    );
    const cartIsEmpty = filteredItems.length === 0;

    return (
      <div className="w100">
        <div
          className={cx(
            styles['Nav'],
            this.props.alertIsActive ? null : 't0',
            'z-nav w100 fixed l0 flex bg-peach text-white items-center transition-fade-in'
          )}
        >
          <div
            className={cx(
              styles['Nav__container'],
              'wh100 bg-peach z-1 flex items-center'
            )}
          >
            <div className="col col-4 md-col-5 flex items-center justify-start">
              {this.state.currentBreakpoint === medium.label ? (
                <div
                  className={cx(
                    styles['Nav__left-menu'],
                    'w100 flex items-center'
                  )}
                >
                  <NavLink
                    exact
                    to="/flavors"
                    className="text-hover mr3 line-item-title text-decoration-none center xs-hide sm-hide"
                  >
                    Ice Cream Flavors
                  </NavLink>
                  <Button
                    className={cx(
                      styles['Nav__location-button'],
                      'line-item-title text-decoration-none center text-white mr3'
                    )}
                    variant="style-none"
                    onClick={closeLocationDropdown}
                    onMouseEnter={() => this.startDropdownTimer('locations')}
                    onMouseLeave={() => this.cancelDropdownTimer('locations')}
                    to="/locations"
                    label="Scoop Shops"
                    hover="underline-white"
                  />
                  <NavLink
                    exact
                    to="/in-stores"
                    className="text-hover mr3 line-item-title text-decoration-none center xs-hide sm-hide"
                  >
                    Where to Buy
                  </NavLink>
                </div>
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
                'col col-4 md-col-2 h100 flex items-center'
              )}
            >
              <NavLink exact to="/" className="flex justify-center">
                <Image
                  className={cx(
                    styles['logo-container__logo'],
                    'col-12 md-col-10 px1'
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
                    className="text-hover line-item-title text-decoration-none center mr2"
                  >
                    Our Story
                  </NavLink>
                  <NavLink
                    exact
                    to="/profile"
                    className="mr2 line-item-title text-decoration-none center"
                  >
                    <Image
                      alt="Profile and user dashboard"
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
                    label="Order Online"
                    onClick={closeShopDropdown}
                    onMouseEnter={() => this.startDropdownTimer('shop')}
                    onMouseLeave={() => this.cancelDropdownTimer('shop')}
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
                ariaLabel="Go to Cart"
                className={cx(
                  styles['Nav__cart-button'],
                  'small flex items-center justify-center'
                )}
                variant="circle"
                color={cartIsEmpty ? 'burgundy' : 'madison-blue'}
                to="/cart"
                label={filteredItems.length.toString()}
                hover="clear-white-border"
              />
            </div>
          </div>
          <div className="w100 absolute t0 l0 z-below">
            {this.state.currentBreakpoint === medium.label ? (
              <ShopDropdown
                products={products}
                shopDropdownIsOpen={shopDropdownIsOpen}
                productLanding={productLanding}
                alertIsActive={alertIsActive}
                openShopDropdown={openShopDropdown}
                closeShopDropdown={closeShopDropdown}
                settings={settings}
              />
            ) : null}
            {this.state.currentBreakpoint === medium.label ? (
              <LocationDropdown
                locationDropdownIsOpen={locationDropdownIsOpen}
                alertIsActive={alertIsActive}
                openLocationDropdown={openLocationDropdown}
                closeLocationDropdown={closeLocationDropdown}
                locationSortedByGroup={this.state.locationSortedByGroup}
                regionOrder={this.state.regionOrder}
                locationDropdownImage={locationDropdownImage}
              />
            ) : null}
          </div>
        </div>
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
    openShopDropdown: PropTypes.func,
    closeShopDropdown: PropTypes.func,
    openLocationDropdown: PropTypes.func,
    closeLocationDropdown: PropTypes.func
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
    openShopDropdown: () => {},
    closeShopDropdown: () => {},
    openLocationDropdown: () => {},
    closeLocationDropdown: () => {}
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
    shopDropdownIsOpen: get(state, 'dropdownNavUI.shopDropdownIsOpen'),
    locationDropdownIsOpen: get(state, 'dropdownNavUI.locationDropdownIsOpen'),
    totalItems: totalItems(state),
    lineItems: lineItems(state),
    productLanding: get(
      state,
      'applicationUI.globalSettings.items[0].fields.productLanding.fields',
      {}
    ),
    products: products(state),
    alertIsActive: alertIsActive(state),
    locations: locations(state),
    settings: get(state, 'applicationUI.settings', {}),
    locationDropdownImage: get(
      state,
      'applicationUI.globalSettings.items[0].fields.locationDropdownNavImage.fields.file.url',
      {}
    )
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
        openShopDropdown,
        closeShopDropdown,
        openLocationDropdown,
        closeLocationDropdown
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);

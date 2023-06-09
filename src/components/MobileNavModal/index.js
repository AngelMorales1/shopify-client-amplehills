import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeMobileNav } from 'state/actions/ui/mobileNavUIActions';
import Global from 'constants/Global';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import locations from 'state/selectors/locations';
import locationsByRegions from 'state/selectors/locationsByRegions';
import locationModel from 'models/locationModel';

import { NavLink } from 'react-router-dom';
import { Button, Image } from 'components/base';
import styles from './MobileNavModal.scss';

class MobileNavModal extends Component {
  state = {
    dropdownIsOpen: false
  };

  componentDidMount() {
    window.addEventListener('resize', this.closeMobileNavOnDesktopView);
    this.closeMobileNavOnDesktopView();
  }

  componentWillMount() {
    window.removeEventListener('resize', this.closeMobileNavOnDesktopView);
  }

  closeMobileNavOnDesktopView = () => {
    const { medium } = Global.breakpoints;
    if (window.innerWidth >= medium.upperbound && this.props.mobileNavIsOpen) {
      this.props.actions.closeMobileNav();
    }
  };

  handleMenuClick = () => {
    this.props.actions.closeMobileNav();
    this.setState({ dropdownIsOpen: false });
  };

  render() {
    const { mobileNavIsOpen, locationsByRegions } = this.props;

    const classes = cx(
      styles['MobileNavModal'],
      'fixed flex wh100 bg-white-wash z-overlay',
      {
        [styles['MobileNavModal--open']]: mobileNavIsOpen
      }
    );

    return (
      <div className={classes} aria-hidden={!mobileNavIsOpen}>
        <div className="overflow-scroll w100 bg-white">
          <Button
            ariaLabel="Close Mobile Menu"
            variant="style-none"
            onClick={this.handleMenuClick}
            className="m3"
          >
            <Image alt="Close button" src="/assets/images/close-icon.svg" />
          </Button>
          <div className="flex flex-column justify-start pl3">
            <Button
              className={cx(
                styles['MobileNavModal__button'],
                'my2 inline-flex'
              )}
              to="/products"
              variant="primary-small"
              color="peach"
              label="Order Online"
              hover="clear-peach-border"
              onClick={this.handleMenuClick}
            />
            <div className="my2">
              <NavLink
                exact
                to="/locations"
                className={cx(styles['MobileNavModal__link-text'])}
                onClick={this.handleMenuClick}
              >
                Scoop Shops
              </NavLink>
              <Button
                ariaLabel="Open Locations menu"
                className={cx(
                  { 'display-none': this.state.dropdownIsOpen },
                  'ml1 transition-slide-up'
                )}
                variant="style-none"
                onClick={() =>
                  this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen })
                }
              >
                <Image src="/assets/images/arrow-dropdown-open.svg" />
              </Button>
              <Button
                ariaLabel="Close Locations menu"
                className={cx(
                  { 'display-none': !this.state.dropdownIsOpen },
                  'ml1 transition-slide-up'
                )}
                variant="style-none"
                onClick={() =>
                  this.state.dropdownIsOpen
                    ? this.setState({ dropdownIsOpen: false })
                    : this.setState({ dropdownIsOpen: true })
                }
              >
                <Image src="/assets/images/arrow-dropdown-close.svg" />
              </Button>
            </div>
            <div>
              {Object.keys(locationsByRegions).map(region => {
                const locations = get(locationsByRegions, region, []);

                return (
                  <div
                    key={region}
                    className={cx(
                      styles['MobileNavModal__location-detail'],
                      'my3 transition-slide-up-large flex flex-column',
                      { 'display-none': !this.state.dropdownIsOpen }
                    )}
                    aria-hidden={!this.state.dropdownIsOpen}
                  >
                    <p className="bold mb1">{region}</p>
                    {locations.map(location => (
                      <NavLink
                        key={location.id}
                        onClick={this.handleMenuClick}
                        exact
                        to={`/location/${location.slug}`}
                        className="mb1 text-decoration-none"
                      >
                        {location.title}
                      </NavLink>
                    ))}
                  </div>
                );
              })}
            </div>
            <NavLink
              exact
              to="/flavors"
              className={cx(styles['MobileNavModal__link-text'], 'my2 mr-auto')}
              onClick={this.handleMenuClick}
            >
              Ice Cream Flavors
            </NavLink>
            <NavLink
              exact
              to="/catering"
              className={cx(styles['MobileNavModal__link-text'], 'my2 mr-auto')}
              onClick={this.handleMenuClick}
            >
              Catering
            </NavLink>
            <NavLink
              exact
              to="/events"
              className={cx(styles['MobileNavModal__link-text'], 'my2 mr-auto')}
              onClick={this.handleMenuClick}
            >
              Events
            </NavLink>
            <NavLink
              exact
              to="/parties"
              className={cx(styles['MobileNavModal__link-text'], 'my2 mr-auto')}
              onClick={this.handleMenuClick}
            >
              Parties & Rentals
            </NavLink>
            <NavLink
              exact
              to="/our-story"
              className={cx(styles['MobileNavModal__link-text'], 'my2 mr-auto')}
              onClick={this.handleMenuClick}
            >
              Our Story
            </NavLink>
            <NavLink
              exact
              to="/contact"
              className={cx(styles['MobileNavModal__link-text'], 'my2 mr-auto')}
              onClick={this.handleMenuClick}
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    mobileNavIsOpen: get(state, 'mobileNavUI.mobileNavIsOpen'),
    locations: locations(state),
    locationsByRegions: locationsByRegions(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        closeMobileNav
      },
      dispatch
    )
  };
};

MobileNavModal.propTypes = {
  actions: PropTypes.shape({
    closeMobileNav: PropTypes.func
  }),
  mobileNavIsOpen: PropTypes.bool,
  locations: PropTypes.arrayOf(locationModel.propTypes),
  locationsByRegions: PropTypes.object
};

MobileNavModal.defaultProps = {
  actions: {
    closeMobileNav: () => {}
  },
  mobileNavIsOpen: false,
  locations: [],
  locationsByRegions: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileNavModal);

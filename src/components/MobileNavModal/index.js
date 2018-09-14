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

  closeMobileNavOnDesktopView = () => {
    const { medium } = Global.breakpoints;
    if (window.innerWidth >= medium.lowerbound && this.props.mobileNavIsOpen) {
      this.props.actions.closeMobileNav();
    }
  };

  handleMenuClick = () => {
    this.props.actions.closeMobileNav();
    this.setState({ dropdownIsOpen: false });
  };

  render() {
    const { mobileNavIsOpen, locations, locationsByRegions } = this.props;
    console.log(locations);
    const classes = cx(
      styles['MobileNavModal'],
      'fixed flex wh100 bg-white-wash z-nav',
      {
        [styles['MobileNavModal--open']]: mobileNavIsOpen
      }
    );

    return (
      <div className={classes}>
        <div className="overflow-scroll w100 bg-white">
          <Button
            variant="style-none"
            onClick={() => this.handleMenuClick()}
            className="m3"
          >
            <Image alt="Close button" src="/assets/images/close-icon.svg" />
          </Button>
          <div className="flex flex-column justify-start pl4">
            <div className="my2">
              <NavLink
                exact
                to="/locations"
                className={cx(styles['MobileNavModal__link-text'])}
                onClick={() => this.handleMenuClick()}
              >
                Locations
              </NavLink>
              <Button
                className={cx(
                  { 'display-none': this.state.dropdownIsOpen },
                  'ml1 transition-slide-up'
                )}
                variant="style-none"
                onClick={() =>
                  this.state.dropdownIsOpen
                    ? this.setState({ dropdownIsOpen: false })
                    : this.setState({ dropdownIsOpen: true })
                }
              >
                <Image src="/assets/images/arrow-dropdown-open.svg" />
              </Button>
              <Button
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
                  >
                    <p className="bold mb1">{region}</p>
                    {locations.map(location => (
                      <NavLink
                        key={location.id}
                        onClick={() => this.handleMenuClick()}
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
              to="/classes-and-socials"
              className={cx(styles['MobileNavModal__link-text'], 'my2 mr-auto')}
              onClick={() => this.handleMenuClick()}
            >
              Classes & Socials
            </NavLink>
            <NavLink
              exact
              to="/parties"
              className={cx(styles['MobileNavModal__link-text'], 'my2 mr-auto')}
              onClick={() => this.handleMenuClick()}
            >
              Parties
            </NavLink>
            <NavLink
              exact
              to="/events"
              className={cx(styles['MobileNavModal__link-text'], 'my2 mr-auto')}
              onClick={() => this.handleMenuClick()}
            >
              Events
            </NavLink>
            <NavLink
              exact
              to="/our-story"
              className={cx(styles['MobileNavModal__link-text'], 'my2 mr-auto')}
              onClick={() => this.handleMenuClick()}
            >
              Our Story
            </NavLink>
            <NavLink
              exact
              to="/contact-us"
              className={cx(styles['MobileNavModal__link-text'], 'my2 mr-auto')}
              onClick={() => this.handleMenuClick()}
            >
              Contact Us
            </NavLink>
            <Button
              className="my2 inline-flex"
              to="/products"
              variant="primary-small"
              color="peach"
              label="Shop Online"
              hover="clear-peach-border"
              onClick={() => this.handleMenuClick()}
            />
          </div>
        </div>
      </div>
    );
  }
}

MobileNavModal.propTypes = {
  actions: PropTypes.shape({
    closeMobileNav: PropTypes.func
  }),
  mobileNavIsOpen: PropTypes.bool,
  locations: PropTypes.arrayOf(locationModel.propTypes),
  locationsByRegions: PropTypes.Object
};

MobileNavModal.defaultProps = {
  actions: {
    closeMobileNav: () => {}
  },
  mobileNavIsOpen: false,
  locations: [],
  locationsByRegions: {}
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileNavModal);

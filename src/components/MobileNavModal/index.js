import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeMobileNav } from 'state/actions/ui/mobileNavUIActions';
import Global from 'constants/Global';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { NavLink } from 'react-router-dom';
import { Button, Image } from 'components/base';
import styles from './MobileNavModal.scss';

class MobileNavModal extends Component {
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

  render() {
    const {
      mobileNavIsOpen,
      actions: { closeMobileNav }
    } = this.props;

    const classes = cx(styles['MobileNavModal'], 'fixed w100 bg-white', {
      [styles['MobileNavModal--open']]: mobileNavIsOpen
    });

    return (
      <div className="relative w100 bg-white-wash z-nav">
        <div className={classes}>
          <Button
            variant="style-none"
            onClick={() => closeMobileNav()}
            className="m3"
          >
            <Image alt="Close button" src="/assets/images/close-icon.svg" />
          </Button>
          <div className="flex flex-column justify-start">
            <NavLink
              exact
              to="/locations"
              className={cx(styles['MobileNavModal__link-text'], 'ml4 my2')}
              onClick={() => closeMobileNav()}
            >
              Locations
            </NavLink>
            <NavLink
              exact
              to="/classes-and-socials"
              className={cx(styles['MobileNavModal__link-text'], 'ml4 my2')}
              onClick={() => closeMobileNav()}
            >
              Classes & Socials
            </NavLink>
            <NavLink
              exact
              to="/parties"
              className={cx(styles['MobileNavModal__link-text'], 'ml4 my2')}
              onClick={() => closeMobileNav()}
            >
              Parties
            </NavLink>
            <NavLink
              exact
              to="/events"
              className={cx(styles['MobileNavModal__link-text'], 'ml4 my2')}
              onClick={() => closeMobileNav()}
            >
              Events
            </NavLink>
            <NavLink
              exact
              to="/our-story"
              className={cx(styles['MobileNavModal__link-text'], 'ml4 my2')}
              onClick={() => closeMobileNav()}
            >
              Our Story
            </NavLink>
            <NavLink
              exact
              to="/contact-us"
              className={cx(styles['MobileNavModal__link-text'], 'ml4 my2')}
              onClick={() => closeMobileNav()}
            >
              Contact Us
            </NavLink>
            <Button
              className="ml4 my2 inline-flex"
              to="/products"
              variant="primary-small"
              color="peach"
              label="Shop Online"
              hover="clear-peach-border"
              onClick={() => closeMobileNav()}
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
  mobileNavIsOpen: PropTypes.bool
};

MobileNavModal.defaultProps = {
  actions: {
    closeMobileNav: () => {}
  },
  mobileNavIsOpen: false
};

const mapStateToProps = state => {
  return {
    ...state,
    mobileNavIsOpen: get(state, 'mobileNavUI.mobileNavIsOpen')
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

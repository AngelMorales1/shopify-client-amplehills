import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  openMobileNav,
  closeMobileNav
} from 'state/actions/ui/mobileNavUIActions';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { Button, Image } from 'components/base';
import styles from './MobileNavModal.scss';

class MobileNavModal extends Component {
  render() {
    const {
      mobileNavIsOpen,
      actions: { closeMobileNav }
    } = this.props;

    const classes = cx(styles['MobileNavModal'], 'absolute w100 bg-white', {
      [styles['MobileNavModal--open']]: mobileNavIsOpen
    });

    return (
      <div className="relative  z-nav">
        <div className={classes}>
          <Button
            variant="style-none"
            onClick={() => closeMobileNav()}
            className="t0 r0 m3 fixed"
          >
            <Image alt="Close button" src="/assets/images/close-icon.svg" />
          </Button>
          <div />
        </div>
      </div>
    );
  }
}

MobileNavModal.propTypes = {
  actions: PropTypes.shape({
    openMobileNav: PropTypes.func,
    closeMobileNav: PropTypes.func
  }),
  mobileNavIsOpen: PropTypes.bool
};

MobileNavModal.defaultProps = {
  actions: {
    openMobileNav: () => {},
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

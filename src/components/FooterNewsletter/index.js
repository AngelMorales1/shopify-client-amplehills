import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import get from 'lodash/get';

import { klaviyoSignup } from 'state/actions/klaviyoActions';
import RoutesWithoutFooterExtras from 'constants/RoutesWithoutFooterExtras';
import { FULFILLED, REJECTED } from 'constants/Status';

import styles from './FooterNewsletter.scss';
import { Image, Button, TextField, FormFlash } from 'components/base';

class FooterNewsletter extends Component {
  state = {
    emailAddress: ''
  };

  routeOmitsNewsletter = () => {
    return RoutesWithoutFooterExtras.includes(this.props.pathname);
  };

  render() {
    if (this.routeOmitsNewsletter()) return null;

    const { klaviyoSignupStatus, actions } = this.props;

    return (
      <div
        className={cx(
          styles['FooterNewsletter'],
          'py4 px3 flex items-center z-1'
        )}
      >
        <div
          className={cx(
            styles['FooterNewsletter__container'],
            'flex items-center relative'
          )}
        >
          <div
            className={cx(
              styles['FooterNewsletter__text-container'],
              'flex flex-column justify-center items-center my2'
            )}
          >
            <p
              className={cx(
                styles['FooterNewsletter__help-text'],
                'small carter center absolute'
              )}
            >
              Get the inside scoop on new flavors, discounts and more.
            </p>
            <p
              className={cx(
                styles['FooterNewsletter__text'],
                'text-peach center'
              )}
            >
              Sign up for our newsletter!
            </p>
          </div>
          <Image
            className="my2 xs-hide sm-hide icon"
            alt="Decorative arrow"
            src="/assets/images/arrow-straight-right.svg"
          />
        </div>
        <div
          className={cx(
            styles['FooterNewsletter__container'],
            'flex items-center'
          )}
        >
          <div
            className={cx(
              styles['FooterNewsletter__text-field'],
              'my2 pb1 relative'
            )}
          >
            <TextField
              ariaLabel="Enter your email address to subscribe"
              value={this.state.emailAddress}
              onChange={value => this.setState({ emailAddress: value })}
              className="w100"
              placeholder="Enter your email address"
              variant="madison-blue-border-round"
            />
            {klaviyoSignupStatus === REJECTED ? (
              <FormFlash
                className="absolute w100 z-1 mt2"
                error={true}
                message="There was an error while attempting to subscribe. Please try again later."
              />
            ) : null}
            {klaviyoSignupStatus === FULFILLED ? (
              <FormFlash
                className="absolute w100 z-1 mt2"
                success={true}
                message="You have been successfully subscribed."
              />
            ) : null}
          </div>
          <Button
            className="my2 px3"
            label="Sign Up"
            variant="primary"
            color="madison-blue"
            shadow={true}
            onClick={() => actions.klaviyoSignup(this.state.emailAddress)}
          />
        </div>
      </div>
    );
  }
}

FooterNewsletter.propTypes = {
  pathname: PropTypes.string
};

FooterNewsletter.defaultProps = {
  pathname: ''
};

const mapStateToProps = state => ({
  klaviyoSignupStatus: get(state, 'status.klaviyoSignup')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ klaviyoSignup }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterNewsletter);

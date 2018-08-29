import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import RoutesWithoutNewsletter from 'constants/RoutesWithoutNewsletter';

import styles from './FooterNewsletter.scss';
import { Image, Button, TextField, FormFlash } from 'components/base';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

class FooterNewsletter extends Component {
  componentDidMount() {
    if (this.routeOmitsNewsletter()) return null;
  }

  state = {
    emailAddress: ''
  };

  routeOmitsNewsletter = () => {
    return RoutesWithoutNewsletter.includes(this.props.pathname);
  };

  resetForm = () => this.setState({ emailAddress: '' });

  render() {
    const url = process.env.REACT_APP_MAILCHIMP_URL;

    return (
      <div
        className={cx(
          styles['FooterNewsletter'],
          'mt4 py4 px3 flex items-center drip bg-white z-1'
        )}
      >
        <div
          className={cx(
            styles['FooterNewsletter__container'],
            'flex items-center'
          )}
        >
          <p
            className={cx(
              styles['FooterNewsletter__text'],
              'my2 text-peach center'
            )}
          >
            Sign up for the latest news from us!
          </p>
          <Image
            className="my2 xs-hide sm-hide icon"
            alt="Decorative arrow"
            src="/assets/images/arrow-straight-right.svg"
          />
        </div>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
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
                  value={this.state.emailAddress}
                  onChange={value => this.setState({ emailAddress: value })}
                  className="w100"
                  placeholder="Enter your email address"
                  variant="madison-blue-border-round"
                />
                {status === 'error' ? (
                  <FormFlash
                    className="absolute w100 z-1 mt2"
                    error={true}
                    message={message}
                  />
                ) : null}
                {status === 'success' ? (
                  <FormFlash
                    className="absolute w100 z-1 mt2"
                    success={true}
                    message={message}
                  />
                ) : null}
              </div>
              <Button
                className="my2 px3"
                label="Sign Up"
                variant="primary"
                color="madison-blue"
                shadow={true}
                onClick={() => subscribe({ EMAIL: this.state.emailAddress })}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default FooterNewsletter;

FooterNewsletter.propTypes = {
  pathname: PropTypes.string
};

FooterNewsletter.defaultProps = {
  pathname: ''
};

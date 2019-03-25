import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './NewsletterModal.scss';
import { Image, Button, TextField, FormFlash } from 'components/base';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

class NewsletterModal extends Component {
  state = {
    emailAddress: ''
  };

  render() {
    const {
      subscribeNewsletterTitle,
      subscribeNewsletterDescription
    } = this.props;
    const url = process.env.REACT_APP_MAILCHIMP_URL;

    return (
      <div
        className={cx(
          'fixed z-nav bg-white card drop-shadow-xlarge px1 py2 mx2 r0',
          styles['NewsletterModal']
        )}
      >
        <div className="flex flex-row items-center justify-between">
          <p className={cx(styles['NewsletterModal__title'], 'px1 text-peach')}>
            {subscribeNewsletterTitle}
          </p>
          <Button
            variant="style-none"
            onClick={this.handleMenuClick}
            className={cx(styles['NewsletterModal__close'], 'mx1')}
          >
            <Image
              alt="Close button"
              src="/assets/images/close-icon-navy.svg"
            />
          </Button>
        </div>
        {subscribeNewsletterDescription ? (
          <p className="block-subheadline pl1 pr3">
            {subscribeNewsletterDescription}
          </p>
        ) : null}
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <div className="mt2 flex flex-column">
              <div className="flex flex-row items-center">
                <div
                  className={cx(
                    styles['NewsletterModal__text-field'],
                    'px1 relative flex items-center'
                  )}
                >
                  <TextField
                    value={this.state.emailAddress}
                    onChange={value => this.setState({ emailAddress: value })}
                    className="w100"
                    placeholder="Email address"
                    variant="madison-blue-border-round-small"
                  />
                </div>
                <Button
                  className="px2"
                  label="Submit"
                  variant="primary-small"
                  color="madison-blue"
                  shadow={true}
                  onClick={() => subscribe({ EMAIL: this.state.emailAddress })}
                />
              </div>
              {status === 'error' ? (
                <FormFlash
                  className="z-1 mt2 mx1"
                  error={true}
                  message={message}
                />
              ) : null}
              {status === 'success' ? (
                <FormFlash
                  className="z-1 mt2 mx1"
                  success={true}
                  message={message}
                />
              ) : null}
            </div>
          )}
        />
      </div>
    );
  }
}

export default NewsletterModal;

NewsletterModal.propTypes = {
  subscribeNewsletterTitle: PropTypes.string,
  subscribeNewsletterDescription: PropTypes.string
};

NewsletterModal.defaultProps = {
  subscribeNewsletterTitle: 'Subscribe to our newsletter!',
  subscribeNewsletterDescription: ''
};

import React, { Component } from 'react';
import cx from 'classnames';
import styles from './FooterNewsletter.scss';
import { Image, Button, TextField } from 'components/base';

class FooterNewsletter extends Component {
  render() {
    return (
      <div
        className={cx(
          styles['FooterNewsletter'],
          'my4 py4 px3 flex items-center'
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
            className={cx(
              styles['FooterNewsletter__image'],
              'my2 xs-hide sm-hide'
            )}
            alt="Decorative left to right arrow"
            src="/assets/images/arrow-left-right.svg"
          />
        </div>
        <div
          className={cx(
            styles['FooterNewsletter__container'],
            'flex items-center'
          )}
        >
          <TextField
            className={cx(styles['FooterNewsletter__text-field'], 'my2 pb1')}
            placeholder="Enter your email address"
            variant="madison-blue-outline-round"
          />
          <Button
            className="my2 px3"
            label="Sign Up"
            variant="primary-short"
            color="madison-blue"
          />
        </div>
      </div>
    );
  }
}

export default FooterNewsletter;

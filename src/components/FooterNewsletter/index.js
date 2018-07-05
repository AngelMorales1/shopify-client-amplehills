import React from 'react';
import cx from 'classnames';
import styles from './FooterNewsletter.scss';
import RoutesWithoutNewsletter from 'constants/RoutesWithoutNewsletter';
import { Image, Button, TextField } from 'components/base';

const FooterNewsletter = () => {
  const routeOmitsNewsletter = () => {
    return RoutesWithoutNewsletter.includes(this.props.pathname);
  };

  if (routeOmitsNewsletter()) return null;
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
        <TextField
          className={cx(styles['FooterNewsletter__text-field'], 'my2 pb1')}
          placeholder="Enter your email address"
          variant="madison-blue-outline-round"
        />
        <Button
          className="my2 px3"
          label="Sign Up"
          variant="primary"
          color="madison-blue"
        />
      </div>
    </div>
  );
};

export default FooterNewsletter;

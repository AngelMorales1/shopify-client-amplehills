import React from 'react';
import cx from 'classnames';

import styles from './ErrorPage.scss';
import { Image } from 'components/base';

const ErrorPage = ({ children }) => {
  return (
    <div className={cx(styles['ErrorPage'], 'fixed-cover bg-peach p3')}>
      {children ? (
        children
      ) : (
        <div className="absolute-cover flex items-center justify-center">
          <div
            className={cx(styles['ErrorPage__container'], 'center text-white')}
          >
            <Image
              className={cx(styles['ErrorPage__logo'], 'w100')}
              src="/assets/images/ample-hills-logo.svg"
            />
            <div className="my3 text-container-width">
              <h1 className="title carter mb2">We'll be right back!</h1>
              <p className="block-subheadline">
                Our online shop is currently unavailable. In the meantime, feel
                free to reach out at{' '}
                <a
                  href="mailto:info@amplehills.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  info@amplehills.com
                </a>{' '}
                or find one of{' '}
                <a
                  href="https://www.google.com/search?q=ample+hills+near+me"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  our scoop shops
                </a>.
              </p>
            </div>
          </div>
          <div className="absolute b0 l0 w100">
            <Image src="/assets/images/ample-hills-walt-walk-animation.gif" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;

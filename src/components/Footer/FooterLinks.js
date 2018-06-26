import React from 'react';
import cx from 'classnames';
import styles from './Footer.scss';
import { Button, Image } from 'components/base';

const FooterLinks = ({ footerLinks }) => {
  return (
    <div className={cx('m4 col-3', styles['Footer__Links-container'])}>
      <h2 className="text-white nowrap block-headline">We would love to talk!</h2>
      <div className="my3 flex">
        <Button
          exact
          to="/contact"
          label="Contact Us"
          color="white-madison-blue"
          className="nowrap"
        />
        <Image
          alt="Decorative left down arrow icon"
          src="/assets/images/arrow-left-down.svg"
          className={cx(
            'arrow mx3 medium-down-display-none xs-hide sm-hide',
            styles['Footer__arrow']
          )}
        />
      </div>
      <div className="mt2">
        <div className="my3 flex items-center">
          <Image
            alt="Instagram icon"
            src="/assets/images/bubble-icon.svg"
            className="icon"
          />
          <a
            href={footerLinks.instagramLink}
            target="_blank"
            rel="noopener"
            className="bold text-white text-decoration-none ml3"
          >
            Instagram
          </a>
        </div>
        <div className="my3 flex items-center">
          <Image
            alt="Instagram icon"
            src="/assets/images/bubble-icon.svg"
            className="icon"
          />
          <a
            href={footerLinks.twitterLink}
            target="_blank"
            rel="noopener"
            className="bold text-white text-decoration-none ml3"
          >
            Twitter
          </a>
        </div>
        <div className="my3 flex items-center">
          <Image
            alt="Instagram icon"
            src="/assets/images/bubble-icon.svg"
            className="icon"
          />
          <a
            href={footerLinks.facebookLink}
            target="_blank"
            rel="noopener"
            className="bold text-white text-decoration-none ml3"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;

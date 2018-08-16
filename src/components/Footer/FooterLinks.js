import React from 'react';
import cx from 'classnames';
import get from 'utils/get';

import styles from './Footer.scss';
import { Button, Image } from 'components/base';
import PropTypes from 'prop-types';
import imageModel from 'models/imageModel';

const FooterLinks = ({ footerLinks, footerIcons }) => {
  return (
    <div
      className={cx(
        'col-3 flex flex-column',
        styles['Footer__Links-container']
      )}
    >
      <h2 className="text-white nowrap block-headline">
        We would love to talk!
      </h2>
      <div className="my3 flex">
        <Button
          exact
          to="/contact"
          label="Contact Us"
          color="white-madison-blue"
          shadow={true}
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
        <a
          href={get(footerLinks, 'instagramLink', '')}
          target="_blank"
          rel="noopener"
          className="my3 flex items-center bold text-white text-decoration-none"
        >
          <Image
            alt="Instagram icon"
            src={get(footerIcons, 'instagramIcon.fields.file.url', '')}
            className="icon mr3"
          />
          Instagram
        </a>
        <a
          href={get(footerLinks, 'twitterLink', '')}
          target="_blank"
          rel="noopener"
          className="my3 flex items-center bold text-white text-decoration-none"
        >
          <Image
            alt="Twitter icon"
            src={get(footerIcons, 'twitterIcon.fields.file.url', '')}
            className="icon mr3"
          />
          Twitter
        </a>
        <a
          href={get(footerLinks, 'facebookLink', '')}
          target="_blank"
          rel="noopener"
          className="my3 flex items-center bold text-white text-decoration-none"
        >
          <Image
            alt="Facebook icon"
            src={get(footerIcons, 'facebookIcon.fields.file.url', '')}
            className="icon mr3"
          />
          Facebook
        </a>
      </div>
    </div>
  );
};

export default FooterLinks;

FooterLinks.propTypes = {
  footerLinks: PropTypes.shape({
    facebookLink: PropTypes.string,
    instagramLink: PropTypes.string,
    twitterLink: PropTypes.string
  }),
  footerIcons: PropTypes.shape({
    facebookIcon: imageModel.propTypes,
    instagramIcon: imageModel.propTypes,
    twitterIcon: imageModel.propTypes
  })
};

FooterLinks.defaultProps = {
  footerLinks: {
    facebookLink: '',
    instagramLink: '',
    twitterLink: ''
  },
  footerIcons: {
    facebookIcon: imageModel.default,
    instagramIcon: imageModel.default,
    twitterIcon: imageModel.default
  }
};

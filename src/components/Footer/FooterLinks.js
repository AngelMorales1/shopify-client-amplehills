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
        <div className="my3 flex items-center">
          <Image
            alt="Instagram icon"
            src={get(footerIcons, 'instagramIcon.fields.file.url', '')}
            className="icon"
          />
          <a
            href={get(footerLinks, 'instagramLink', '')}
            target="_blank"
            rel="noopener"
            className="bold text-white text-decoration-none ml3"
          >
            Instagram
          </a>
        </div>
        <div className="my3 flex items-center">
          <Image
            alt="Twitter icon"
            src={get(footerIcons, 'twitterIcon.fields.file.url', '')}
            className="icon"
          />
          <a
            href={get(footerLinks, 'twitterLink', '')}
            target="_blank"
            rel="noopener"
            className="bold text-white text-decoration-none ml3"
          >
            Twitter
          </a>
        </div>
        <div className="my3 flex items-center">
          <Image
            alt="Facebook icon"
            src={get(footerIcons, 'facebookIcon.fields.file.url', '')}
            className="icon"
          />
          <a
            href={get(footerLinks, 'facebookLink', '')}
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

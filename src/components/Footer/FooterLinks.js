import React from 'react';
import cx from 'classnames';
import get from 'utils/get';

import styles from './Footer.scss';
import { Button, Image } from 'components/base';
import PropTypes from 'prop-types';
import imageModel from 'models/imageModel';
import contentfulImgUtil from 'utils/contentfulImgUtil';

const FooterLinks = ({ footerLinks, footerIcons }) => {
  return (
    <div
      className={cx(
        'col-3 flex flex-column',
        styles['Footer__Links-container']
      )}
    >
      <div className="mt2">
        <a
          href={get(footerLinks, 'instagramLink', '')}
          target="_blank"
          rel="noopener"
          className={cx(
            styles['Footer__link'],
            'my3 flex items-center bold text-white text-decoration-none'
          )}
        >
          <Image
            alt="Instagram icon"
            src={contentfulImgUtil(
              get(footerIcons, 'instagramIcon.fields.file.url', ''),
              '200',
              'png'
            )}
            className="icon mr3"
          />
          <span className={cx(styles['Footer__link-text'])}>Instagram</span>
        </a>
        <a
          href={get(footerLinks, 'twitterLink', '')}
          target="_blank"
          rel="noopener"
          className={cx(
            styles['Footer__link'],
            'my3 flex items-center bold text-white text-decoration-none'
          )}
        >
          <Image
            alt="Twitter icon"
            src={contentfulImgUtil(
              get(footerIcons, 'twitterIcon.fields.file.url', ''),
              '200',
              'png'
            )}
            className="icon mr3"
          />
          <span className={cx(styles['Footer__link-text'])}>Twitter</span>
        </a>
        <a
          href={get(footerLinks, 'facebookLink', '')}
          target="_blank"
          rel="noopener"
          className={cx(
            styles['Footer__link'],
            'my3 flex items-center bold text-white text-decoration-none'
          )}
        >
          <Image
            alt="Facebook icon"
            src={contentfulImgUtil(
              get(footerIcons, 'facebookIcon.fields.file.url', ''),
              '200',
              'png'
            )}
            className="icon mr3"
          />
          <span className={cx(styles['Footer__link-text'])}>Facebook</span>
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

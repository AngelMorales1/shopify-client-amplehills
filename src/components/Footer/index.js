import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import { Image, Button } from 'components/base';
import { NavLink } from 'react-router-dom';
import locationModel from 'models/locationModel';

import styles from './Footer.scss';

const Footer = ({
  footerIllustration,
  footerLinks,
  locations,
  footerIcons
}) => {
  return (
    <div className={cx('flex p4 bg-peach', styles['Footer'])}>
      <div
        className={cx(
          styles['Footer__contact-us-container'],
          'flex flex-column col-12 md-col-4 mt3'
        )}
      >
        <h2 className="text-white block-headline">
          Need help? Wanna chat? We would love to talk!
        </h2>
        <Button
          exact
          to="/contact"
          label="Contact Us"
          color="white-peach"
          shadow={true}
          className={cx(styles['Footer__button'], 'nowrap inline-flex')}
        />
      </div>
      <div
        className={cx(
          styles['Footer__link-container'],
          'flex flex-column justify-start'
        )}
      >
        <div className="col-3 flex flex-column mb4">
          <div>
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
        <span className="bold small text-white">
          &copy; 2018 Ample Hills Creamery.
          <NavLink
            exact
            to="/privacy-policy"
            className={cx(
              styles['Footer__privacy-link'],
              'text-decoration-none'
            )}
          >
            {' Privacy Policy '}
          </NavLink>
          &
          <NavLink
            exact
            to="/web-accessibility"
            className={cx(
              styles['Footer__privacy-link'],
              'text-decoration-none'
            )}
          >
            {' Accessibility'}
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default Footer;

Footer.propTypes = {
  footerIllustration: PropTypes.shape({
    fields: PropTypes.shape({
      description: PropTypes.string,
      file: PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string
      })
    })
  }),
  footerLinks: PropTypes.object,
  footerIcons: PropTypes.object,
  locations: PropTypes.arrayOf(locationModel.propTypes)
};

Footer.defaultProps = {
  footerIllustration: {
    fields: {
      description: '',
      file: {
        title: '',
        url: ''
      }
    }
  },
  footerLinks: {},
  footerIcons: {},
  locations: []
};

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { Image } from 'components/base';
import FooterLocations from './FooterLocations.js';
import FooterLinks from './FooterLinks.js';
import locationModel from 'models/locationModel';
import get from 'utils/get';

import styles from './Footer.scss';

const Footer = ({ footerIllustration, footerLinks, locations }) => {
  return (
    <div
      className={cx('flex flex-column p4 bg-madison-blue', styles['Footer'])}
    >
      <div className={cx('flex', styles['Footer__container'])}>
        <FooterLocations locations={locations} />
        <FooterLinks
          footerIllustration={footerIllustration}
          footerLinks={footerLinks}
        />
      </div>
      <span className="bold small text-white center">
        &copy; 2018 Ample Hills Creamery. Privacy Policy & Accessibility
      </span>
      {footerIllustration.fields ? (
        <Image
          src={get(footerIllustration, 'fields.file.url', '')}
          className={cx(
            styles['Footer__illustration'],
            'medium-down-display-none xs-hide sm-hide'
          )}
        />
      ) : null}
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
  locations: []
};

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Footer.scss';
import FooterLocations from './FooterLocations.js';
import FooterLinks from './FooterLinks.js';
import { Image } from 'components/base';

const Footer = ({ footerIllustration, footerLinks, locations }) => {
  const sortDataByRegion = (data = []) => {
    return data.reduce((accumulated, current) => {
      let region = current.fields.region;
      accumulated[region]
        ? (accumulated[region] = accumulated[region].concat([current]))
        : (accumulated[region] = [current]);
      return accumulated;
    }, {});
  };

  return (
    <div className={cx('flex p4 bg-madison-blue', styles['Footer'])}>
      <div className={cx(styles['Footer__container'])}>
        <FooterLocations locations={sortDataByRegion(locations.items)} />
        <FooterLinks
          footerIllustration={footerIllustration}
          footerLinks={footerLinks}
        />
      </div>
      <span className="bold small text-white center">
        &copy; 2018 Ample Hills Creamery. Privacy Policy & Accessibility
      </span>
      {footerIllustration ? (
        <Image
          src={footerIllustration.fields.file.url}
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
  locations: PropTypes.shape({
    items: PropTypes.array
  })
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
  locations: {
    items: []
  }
};

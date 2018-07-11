import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import FooterRegions from './FooterRegions.js';
import styles from './Footer.scss';

const FooterLocations = ({ locations }) => {
  const regions = Object.keys(locations);

  return (
    <div
      className={cx(
        'flex flex-column m4',
        styles['Footer__Locations-container']
      )}
    >
      <h2 className="mb2 text-white block-headline">Locations</h2>
      <div
        className={cx(
          'flex flex-column flex-wrap',
          styles['Footer__Regions-container']
        )}
      >
        {regions.map(region => (
          <FooterRegions
            key={region}
            region={region}
            locations={locations[region]}
          />
        ))}
      </div>
    </div>
  );
};

export default FooterLocations;

FooterLocations.propTypes = {
  locations: PropTypes.object
};

FooterLocations.defaultProps = {
  locations: {}
};

import React from 'react';
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
            stores={locations[region]}
          />
        ))}
      </div>
    </div>
  );
};

export default FooterLocations;

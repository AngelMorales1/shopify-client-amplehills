import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { sortHours } from 'utils/sortHours';
import FooterRegions from 'constants/FooterRegions';
import locationModel from 'models/locationModel';

import styles from './Footer.scss';

const FooterLocations = ({ locations }) => {
  const locationsSortedByRegion = (locations = []) => {
    const regions = locations.reduce((accumulated, current) => {
      let region = current.region;
      accumulated[region] = accumulated[region]
        ? accumulated[region].concat([current])
        : [current];

      return accumulated;
    }, {});

    return FooterRegions.reduce(
      (accumulated, region) => ({
        ...accumulated,
        [region]: regions[region]
      }),
      {}
    );
  };

  const regions = locationsSortedByRegion(locations);

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
        {Object.keys(regions).map(region => (
          <div
            className={cx(
              'flex flex-column',
              styles['Footer__Regions-content']
            )}
          >
            <h3 className="my2 text-white callout">{region}</h3>
            {regions[region].map(location => {
              console.log('sdsdds');
              let hours = sortHours(location);
              console.log(hours);
              return (
                <div
                  className={cx('mb3', styles['Footer__Regions-store'])}
                  key={location.id}
                >
                  <h4 className="mb1 text-white bold small nowrap">
                    {location.title}
                  </h4>
                  {Object.keys(hours).map((hour, i) => {
                    return (
                      <p className="mb1 text-white small nowrap" key={i}>{`${
                        hours[hour]
                      }: ${hour}`}</p>
                    );
                  })}
                  {location.delivery ? (
                    <div className="bg-white text-madison-blue inline-block mt1 nowrap tag">
                      Order Delivery
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterLocations;

FooterLocations.propTypes = {
  locations: PropTypes.arrayOf(locationModel.propTypes)
};

FooterLocations.defaultProps = {
  locations: []
};

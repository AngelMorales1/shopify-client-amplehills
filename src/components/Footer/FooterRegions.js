import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { sortHours } from 'utils/sortHours';
import styles from './Footer.scss';

const FooterRegions = ({ region, locations }) => {
  return (
    <div className={cx('flex flex-column', styles['Footer__Regions-content'])}>
      <h3 className="my2 text-white callout">{region}</h3>
      {locations.map(location => {
        let hours = sortHours(location);
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
  );
};

export default FooterRegions;

FooterRegions.propTypes = {
  region: PropTypes.string,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      delivery: PropTypes.bool,
      monday: PropTypes.string,
      tuesday: PropTypes.string,
      wednesday: PropTypes.string,
      thursday: PropTypes.string,
      friday: PropTypes.string,
      saturday: PropTypes.string,
      sunday: PropTypes.string,
      id: PropTypes.string
    })
  )
};

FooterRegions.defaultProps = {
  region: '',
  locations: []
};

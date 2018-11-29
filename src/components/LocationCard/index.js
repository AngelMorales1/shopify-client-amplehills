import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import locationModel from 'models/locationModel';
import getLocationCity from 'utils/getLocationCity';
import { Button } from 'components/base';

import styles from './LocationCard.scss';

const LocationCard = ({ locationUrl, location, selectedLocation, getRef }) => {
  const closeLocationForTheSeason = get(
    location,
    'closeLocationForTheSeason',
    false
  );
  const currentOpenHours = location.hours[location.currentOpenHours];
  let openStatus = 'Closed today';

  if (closeLocationForTheSeason) {
    openStatus = 'Closed for the season';
  } else {
    if (currentOpenHours) {
      openStatus = 'Open today';
    }
  }

  return (
    <a
      href={locationUrl}
      key={location.id}
      ref={getRef}
      className={cx(
        styles['LocationCard__card-container'],
        'transition-slide-up-large transition bg-white my2 flex flex-column justify-between relative w100',
        {
          [styles['LocationCard__card-container--selected']]:
            location.id === selectedLocation
        }
      )}
    >
      {location.distance ? (
        <div
          className={cx(
            styles['LocationCard__card-tag'],
            'bg-peach bold text-white absolute m3'
          )}
        >
          <span className={cx(styles['LocationCard__card-text'], 'uppercase')}>
            {location.distance} miles away
          </span>
        </div>
      ) : null}
      <div
        className={cx(
          styles['LocationCard__card-seasonal-image'],
          'circle z-1 absolute bg-peach flex justify-center items-center p1',
          { 'bg-bright-turquoise': location.seasonal }
        )}
      >
        <p className="center carter text-white">
          {location.seasonal ? 'Seasonal' : 'Year Round'}
        </p>
      </div>
      <div
        style={
          location.image
            ? {
                background: `url(${location.image}) no-repeat center`,
                backgroundSize: 'cover'
              }
            : null
        }
        className={cx(styles['LocationCard__card-image'], {
          'bg-denim': !location.image
        })}
      />
      <div className={cx(styles['LocationCard__card-drip'], 'p3')}>
        <h2 className="big carter mb2">{location.title}</h2>
        <div>
          <div className="flex flex-column justify-between">
            <span className="small">{location.address1}</span>
            <span className={cx(styles['LocationCard__card-text'], 'small')}>
              {getLocationCity(location)}
            </span>
            <span className={cx(styles['LocationCard__card-text'], 'small')}>
              {location.phone}
            </span>
          </div>
        </div>
        <div>
          <div className="flex flex-row flex-wrap justify-between items-center mt2">
            <div className="flex flex-column">
              <span className="block-subheadline bold">{openStatus}</span>
              {!closeLocationForTheSeason && currentOpenHours ? (
                <span className={cx('small')}>{currentOpenHours}</span>
              ) : null}
            </div>
            {location.delivery ? (
              <Button
                className={cx(styles['LocationCard__card-tag'], 'uppercase')}
                color="madison-blue"
                variant="primary-small"
                label="Delivery"
                to={location.orderDeliveryLink}
                newTab={true}
              />
            ) : null}
          </div>
        </div>
      </div>
    </a>
  );
};

LocationCard.propTypes = {
  location: locationModel.propTypes,
  selectedLocation: PropTypes.string
};

LocationCard.defaultProps = {
  location: {},
  selectedLocation: null
};

export default LocationCard;

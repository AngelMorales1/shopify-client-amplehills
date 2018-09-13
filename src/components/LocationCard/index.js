import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import locationModel from 'models/locationModel';
import getLocationCity from 'utils/getLocationCity';

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
      {location.seasonal ? (
        <div
          className={cx(
            styles['LocationCard__card-seasonal-image'],
            'z-1 absolute'
          )}
          style={{
            background: 'url(assets/images/seasonal-icon.png) no-repeat center',
            backgroundSize: 'cover'
          }}
        />
      ) : (
        <div
          className={cx(
            styles['LocationCard__card-seasonal-image'],
            'z-1 absolute'
          )}
          style={{
            background:
              'url(assets/images/year-round-icon.png) no-repeat center',
            backgroundSize: 'cover'
          }}
        />
      )}
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
              <div
                className={cx(
                  styles['LocationCard__card-tag'],
                  'uppercase bold bg-madison-blue inline-block text-white mt2'
                )}
              >
                <span className="text-white">Delivery</span>
              </div>
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

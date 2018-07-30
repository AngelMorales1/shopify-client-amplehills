import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { Image, Button } from 'components/base';
import styles from './LocationsSideRail.scss';

const LocationsSideRail = props => {
  const locations = props.locations;

  const getTodayOpenHours = location => {
    const currentDay = new Date()
      .toString()
      .split(' ')[0]
      .toLowerCase();
    const todayOpenHours = Object.keys(location).filter(
      field => field.slice(0, 3) === currentDay
    );

    return todayOpenHours;
  };

  return (
    <div
      className={cx(
        styles['LocationsSideRail'],
        'overflow-scroll bg-goldenrod'
      )}
    >
      <div className="mt3 mb4 col-10 mx-auto">
        {locations.map((location, index) => {
          const locationOpenHours = getTodayOpenHours(location);
          const imageUrl = get(location, 'image.fields.file.url', '');

          return (
            <div
              key={`${index}-${location.id}`}
              className={cx(
                styles['LocationsSideRail__card-container'],
                'bg-white my3'
              )}
            >
              <div
                style={
                  imageUrl.length > 0
                    ? {
                        background: `url(${imageUrl}) no-repeat center`,
                        backgroundSize: 'cover'
                      }
                    : { backgroundColor: '#1a6db6' }
                }
                className={cx(styles['LocationsSideRail__card-image'])}
              />
              <div className="p2">
                <h2 className="description-title carter">{location.title}</h2>
                <div>
                  <div className="flex flex-column">
                    <span className="tout">{location.address1}</span>
                    <span className="tout">{location.address2}</span>
                    <span className="tout">{`${location.city}, ${
                      location.state
                    } ${location.zip}`}</span>
                    <span className="tout">{location.phone}</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row justify-between mt2">
                    {locationOpenHours.length ? (
                      <div className="flex flex-column">
                        <span className="block-subheadline bold">
                          Open today
                        </span>
                        <span className="tout">
                          {location[locationOpenHours[0]]}
                        </span>
                      </div>
                    ) : (
                      <span className="block-subheadline bold">
                        Closed today
                      </span>
                    )}
                    {location.delivery ? (
                      <div className="tag uppercase bg-madison-blue info-text-big text-white inline-block">
                        Delivery
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// LocationsMap.propTypes = {
//   locationGeoJSON: PropTypes.shape({
//     type: PropTypes.string,
//     features: PropTypes.arrayOf(PropTypes.object)
//   })
// };

export default LocationsSideRail;

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
      <div className="mt3 mb4 col-11 md-col-10 mx-auto">
        {locations.map((location, index) => {
          const locationOpenHours = getTodayOpenHours(location);
          const imageUrl = get(location, 'image.fields.file.url', '');
          const seasonalBackground = get(location, 'seasonal', true)
            ? 'bg-pastel-pink'
            : 'bg-pastel-blue';
          console.log(location);
          return (
            <div
              key={`${index}-${location.id}`}
              className={cx(
                styles['LocationsSideRail__card-container'],
                'bg-white my3 flex flex-column justify-between relative'
              )}
            >
              <div
                className={cx(
                  styles['LocationsSideRail__card-seasonal'],
                  'z-1 absolute flex flex-column items-center justify-center'
                )}
              >
                <Image
                  className={cx(
                    styles['LocationsSideRail__card-seasonal-image'],
                    'z-overlay'
                  )}
                  src={get(location, 'seasonalImage.fields.file.url', '')}
                />
                <div
                  className={cx(
                    styles['LocationsSideRail__card-seasonal-circle'],
                    seasonalBackground,
                    'circle flex flex-column items-center justify-center'
                  )}
                >
                  <span
                    className={cx(
                      styles['LocationsSideRail__card-seasonal-circle-text'],
                      'text-white small bold'
                    )}
                  >
                    {location.seasonal ? 'S' : 'YR'}
                  </span>
                </div>
              </div>
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
              <div className={cx(styles['LocationsSideRail__card-drip'], 'p3')}>
                <h2 className="big carter mb3">{location.title}</h2>
                <div>
                  <div className="flex flex-column justify-between">
                    <span className="small">{location.address1}</span>
                    <span
                      className={cx(
                        styles['LocationsSideRail__card-text'],
                        'small'
                      )}
                    >{`${location.city}, ${location.state} ${
                      location.zip
                    }`}</span>
                    <span
                      className={cx(
                        styles['LocationsSideRail__card-text'],
                        'small'
                      )}
                    >
                      {location.phone}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row justify-between items-center mt2">
                    {locationOpenHours.length ? (
                      <div className="flex flex-column">
                        <span className="block-subheadline bold">
                          Open today
                        </span>
                        <span className={cx('small')}>
                          {location[locationOpenHours[0]]}
                        </span>
                      </div>
                    ) : (
                      <span className="block-subheadline bold">
                        Closed today
                      </span>
                    )}
                    {location.delivery ? (
                      <div
                        className={cx(
                          styles['LocationsSideRail__card-delivery'],
                          'uppercase bold bg-madison-blue inline-block'
                        )}
                      >
                        <span className="info-text-big text-white">
                          Delivery
                        </span>
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

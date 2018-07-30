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
    <div className={cx(styles['LocationsSideRail'], 'overflow-scroll')}>
      {locations.map((location, index) => {
        const locationOpenHours = getTodayOpenHours(location);

        return (
          <div key={`${index}-${location.id}`} className="col-10 mx-auto">
            <div>
              <Image
                src={get(location, 'image.fields.file.url', '')}
                alt={`${location.title} image`}
              />
            </div>
            <div>
              <h2>{location.title}</h2>
              <div>
                <div>
                  <span>{location.address1}</span>
                  <span>{location.address2}</span>
                  <span>{`${location.city}, ${location.state} ${
                    location.zip
                  }`}</span>
                </div>
              </div>
              <div>
                <div>
                  {locationOpenHours.length ? (
                    <div>
                      <span>Open today</span>
                      <span>{location[locationOpenHours[0]]}</span>
                    </div>
                  ) : (
                    <span>Closed today</span>
                  )}
                  {location.delivery ? <div>Delivery</div> : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
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

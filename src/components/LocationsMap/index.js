import React from 'react';
import PropTypes from 'prop-types';

import MapboxMap from 'components/MapboxMap';
import styles from './LocationsMap.scss';

const LocationsMap = props => {
  console.log(props.locations);
  return (
    <div className={styles['LocationsMap']}>
      <MapboxMap
        featureCollection={props.locationGeoJSON}
        defaultIcon="year-round-icon"
        styleUrl="mapbox://styles/joshiefishbein/cjjyuj8fq0hrj2ro2j8066e4q"
        cluster
        collections={[
          {
            name: 'Selected',
            filter: {
              ids: []
            },
            icon: 'selected-location-icon'
          },
          {
            name: 'SeasonalLocations',
            filter: {
              ids: props.locations
                .filter(location => location.seasonal)
                .map(location => location.id)
            },
            icon: 'seasonal-icon'
          },
          {
            name: 'HiddenByFilter',
            filter: {
              ids: []
            },
            visible: false
          }
        ]}
      />
    </div>
  );
};

LocationsMap.propTypes = {
  locationGeoJSON: PropTypes.shape({
    type: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.object)
  })
};

export default LocationsMap;

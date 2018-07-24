import React from 'react';
import PropTypes from 'prop-types';

import MapboxMap from 'components/MapboxMap';
import styles from './LocationsMap.scss';

const LocationsMap = props => {
  return (
    <div className={styles['LocationsMap']}>
      <MapboxMap
        featureCollection={props.locationGeoJSON}
        defaultIcon="year-round-icon"
        styleUrl="mapbox://styles/joshiefishbein/cjjyuj8fq0hrj2ro2j8066e4q"
        cluster
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

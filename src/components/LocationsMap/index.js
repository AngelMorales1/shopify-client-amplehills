import React from 'react';
import MapboxMap from 'components/MapboxMap';

import styles from './LocationsMap.scss';

const LocationsMap = props => {
  return (
    <div className={styles['LocationsMap']}>
      <MapboxMap
        featureCollection={props.locationGeo}
        styleUrl="mapbox://styles/joshiefishbein/cjjyuj8fq0hrj2ro2j8066e4q"
      />
    </div>
  );
};

export default LocationsMap;

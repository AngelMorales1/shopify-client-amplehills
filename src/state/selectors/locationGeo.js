import { createSelector } from 'reselect';
import get from 'utils/get';

import locations from 'state/selectors/locations';

export default createSelector(
  state => locations(state),
  locations => {
    console.log(locations);
    return {
      type: 'FeatureCollection',
      features: locations.map(location => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude]
        },
        properties: {
          ...location
        }
      }))
    };
  }
);

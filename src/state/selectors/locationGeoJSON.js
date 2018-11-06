import { createSelector } from 'reselect';

import locations from 'state/selectors/locations';

export default createSelector(
  state => locations(state),
  locations => {
    return {
      type: 'FeatureCollection',
      features: locations.map(location => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [location.coordinates.lon, location.coordinates.lat]
        },
        properties: {
          id: location.id
        }
      }))
    };
  }
);

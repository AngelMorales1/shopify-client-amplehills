import { createSelector } from 'reselect';

import locations from 'state/selectors/locations';

export default createSelector(
  state => locations(state),
  locations => {
    return {
      type: 'FeatureCollection',
      features: locations
        .filter(
          location => location.coordinates.lon && location.coordinates.lat
        )
        .map(location => ({
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

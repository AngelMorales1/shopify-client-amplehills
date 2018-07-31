import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'locations.locations'),
  locations => {
    const selectedLocations = get(locations, 'items', []).map(location => {
      const id = get(location, 'sys.id', '');
      const fields = get(location, 'fields', {});

      const hours = {};
      const rearrangedLocations = Object.keys(fields).reduce(
        (accumulated, current) => {
          if (current.slice(-3) === 'day') {
            hours[current] = fields[current];
          } else {
            accumulated[current] = fields[current];
          }
          return accumulated;
        },
        {}
      );
      rearrangedLocations.hours = hours;

      return {
        id,
        ...rearrangedLocations
      };
    });

    return selectedLocations;
  }
);

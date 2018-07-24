import { createSelector } from 'reselect';
import get from 'utils/get';

import locations from 'state/selectors/locations';

export default createSelector(
  state => get(state, 'locations.locations'),
  locations => {
    const selectedLocations = get(locations, 'items', []).map(location => {
      const id = get(location, 'sys.id', '');
      const fields = get(location, 'fields', {});
      return {
        id,
        ...fields
      };
    });

    return selectedLocations;
  }
);

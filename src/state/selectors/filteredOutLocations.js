import { createSelector } from 'reselect';
import get from 'utils/get';

import locations from 'state/selectors/locations';

export default createSelector(
  state => locations(state),
  state => get(state, 'locationsUI.locationFilters', []),
  (locations, locationFilters) => {
    const filteredOutLocations = get(locations, 'items', []).map(location => {
      const id = get(location, 'sys.id', '');
      const fields = get(location, 'fields', {});
      return {
        id,
        ...fields
      };
    });

    return filteredOutLocations;
  }
);

import { createSelector } from 'reselect';
import get from 'utils/get';

import locations from 'state/selectors/locations';
import filteredLocations from 'state/selectors/filteredLocations';

export default createSelector(
  state => locations(state),
  state => filteredLocations(state),
  (locations, filteredLocations) => {
    return locations
      .filter(location => !filteredLocations.includes(location))
      .map(location => location.id);
  }
);

import { createSelector } from 'reselect';
import get from 'utils/get';

import locations from 'state/selectors/locations';

export default createSelector(
  state => locations(state),
  state => get(state, 'locationsUI.locationFilters', []),
  (locations, locationFilters) => {
    const filteredLocations = locations.filter(location => {
      return (
        !locationFilters.length ||
        locationFilters.every(filter => location[filter.key] == filter.value)
      );
    });

    return locations
      .filter(location => !filteredLocations.includes(location))
      .map(location => location.id);
  }
);

import { createSelector } from 'reselect';
import get from 'utils/get';

import locations from 'state/selectors/locations';

const locationMatchesSearch = (fields, searchFilter) => {
  return fields.some(field =>
    field.toLowerCase().includes(searchFilter.toLowerCase())
  );
};

export default createSelector(
  state => locations(state),
  state => get(state, 'locationsUI.locationFilters', []),
  state => get(state, 'locationsUI.searchFilter', ''),
  (locations, locationFilters, searchFilter) => {
    const filteredLocations = locations.filter(
      location =>
        !locationFilters.length ||
        locationFilters.every(filter => location[filter.key] === filter.value)
    );

    return filteredLocations.filter(
      location =>
        !searchFilter ||
        locationMatchesSearch(
          location.stringifiedSearchableFields,
          searchFilter
        )
    );
  }
);

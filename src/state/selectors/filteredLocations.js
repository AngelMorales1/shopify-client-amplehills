import { createSelector } from 'reselect';
import get from 'utils/get';
import distance from '@turf/distance';

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
  state => get(state, 'locationsUI.searchResult', ''),
  (locations, locationFilters, searchFilter, searchResult) => {
    const filteredLocations = locations.filter(
      location =>
        !locationFilters.length ||
        locationFilters.every(filter => location[filter.key] === filter.value)
    );

    const searchFilterLocations = filteredLocations.filter(
      location =>
        !searchFilter ||
        locationMatchesSearch(
          location.stringifiedSearchableFields,
          searchFilter
        )
    );

    if (searchFilterLocations.length) {
      return searchFilterLocations;
    } else {
      const searchResultCoordinates = get(searchResult, 'coordinates', [0, 0]);

      const filteredLocationsWithDistanceFromSearchResult = filteredLocations.map(
        filteredLocation => {
          const filteredLocationCoordinates = filteredLocation.coordinates;
          const filteredLocationCoordinatesArray = [
            filteredLocationCoordinates.lon,
            filteredLocationCoordinates.lat
          ];
          const distanceFromSearchResult = distance(
            searchResultCoordinates,
            filteredLocationCoordinatesArray,
            { units: 'miles' }
          );

          filteredLocation.distanceFromSearchResult = distanceFromSearchResult;

          return filteredLocation;
        }
      );
      return filteredLocationsWithDistanceFromSearchResult.sort(
        (a, b) => a.distanceFromSearchResult - b.distanceFromSearchResult
      );
    }
  }
);

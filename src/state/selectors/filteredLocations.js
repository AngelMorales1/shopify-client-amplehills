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

    if (
      searchFilterLocations.length &&
      searchResult.type !== 'region' &&
      searchResult.type !== 'place' &&
      searchResult.type !== 'neighborhood' &&
      searchResult.type !== 'locality'
    ) {
      return searchFilterLocations;
    } else if (
      searchResult.type === 'region' ||
      searchResult.type === 'place' ||
      searchResult.type === 'neighborhood' ||
      searchResult.type === 'locality'
    ) {
      const searchResultBbox = get(searchResult, 'bbox', [0, 0, 0, 0]);

      const getLocationInsideBbox = filteredLocations.reduce(
        (locationsInsideBbox, location) => {
          const locationCoordinates = get(location, 'coordinates', {});
          const locationLat = get(locationCoordinates, 'lat', 0);
          const locationLon = get(locationCoordinates, 'lon', 0);

          if (
            locationLat >= searchResultBbox[1] &&
            locationLat <= searchResultBbox[3] &&
            (locationLon >= searchResultBbox[0] &&
              locationLon <= searchResultBbox[2])
          ) {
            locationsInsideBbox.push(location);
          }

          return locationsInsideBbox;
        },
        []
      );

      return getLocationInsideBbox;
    } else {
      const searchResultCoordinates = get(searchResult, 'coordinates', [0, 0]);

      const filteredLocationsWithDistanceFromSearchResult = filteredLocations.reduce(
        (sanitizedLocation, filteredLocation) => {
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

          if (searchResult.type !== 'region' && distanceFromSearchResult < 5) {
            filteredLocation.distanceFromSearchResult = distanceFromSearchResult;
            sanitizedLocation.push(filteredLocation);
          }

          return sanitizedLocation;
        },
        []
      );
      return filteredLocationsWithDistanceFromSearchResult.sort(
        (a, b) => a.distanceFromSearchResult - b.distanceFromSearchResult
      );
    }
  }
);

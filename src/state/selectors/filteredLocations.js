import { createSelector } from 'reselect';
import get from 'utils/get';
import distance from '@turf/distance';

import locations from 'state/selectors/locations';

const locationMatchesSearch = (fields, searchFilter) => {
  return fields.some(field =>
    field.toLowerCase().includes(searchFilter.toLowerCase())
  );
};

const getLocationsInMaxDistance = (searchResult, locations, maxDistance) => {
  const searchResultCoordinates = get(searchResult, 'coordinates', [0, 0]);

  const locationsWithinDistanceFromSearchResult = locations.reduce(
    (sanitizedLocation, location) => {
      const locationCoordinates = location.coordinates;
      const locationCoordinatesArray = [
        locationCoordinates.lon,
        locationCoordinates.lat
      ];
      const distanceFromSearchResult = distance(
        searchResultCoordinates,
        locationCoordinatesArray,
        { units: 'miles' }
      );

      if (distanceFromSearchResult < maxDistance) {
        location.distanceFromSearchResult = distanceFromSearchResult;
        sanitizedLocation.push(location);
      }

      return sanitizedLocation;
    },
    []
  );
  return locationsWithinDistanceFromSearchResult.sort(
    (a, b) => a.distanceFromSearchResult - b.distanceFromSearchResult
  );
};

const getLocationInsideBoundingBox = (searchResult, locations) => {
  const searchResultBbox = get(searchResult, 'bbox', [0, 0, 0, 0]);

  const getLocationInsideBbox = locations.reduce(
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
      searchResult.type === 'region' ||
      searchResult.type === 'place' ||
      searchResult.type === 'neighborhood' ||
      searchResult.type === 'locality'
    ) {
      const locationInBox = getLocationInsideBoundingBox(
        searchResult,
        filteredLocations
      );
      //If location is not inside of search result, get location in 5 miles from search result.
      return locationInBox.length
        ? locationInBox
        : getLocationsInMaxDistance(searchResult, filteredLocations, 5);
    } else if (searchFilterLocations.length) {
      return searchFilterLocations;
    }

    return getLocationsInMaxDistance(searchResult, filteredLocations, 5);
  }
);

import get from 'utils/get';
import distance from '@turf/distance';
import center from '@turf/center';
import { points } from '@turf/helpers';

import {
  FARTHER_FROM_BROOKLYN,
  FARTHEST_FROM_BROOKLYN,
  BROOKLYN
} from 'constants/LocationGroups';

const locationSortedByGroup = {
  [BROOKLYN]: {},
  [FARTHER_FROM_BROOKLYN]: {},
  [FARTHEST_FROM_BROOKLYN]: {}
};

const regionOrder = {
  fartherOrder: [],
  farthestOrder: []
};

const brooklynCoordinates = [-73.949997, 40.650002];

const getRegionOrderedByDistanceFromBK = regions => {
  const regionsWithDistance = [];

  Object.keys(regions).forEach(region => {
    const regionLocationsCoordinates = [];

    regions[region].forEach(location => {
      const locationCoordinates = [
        location.coordinates.lon,
        location.coordinates.lat
      ];
      regionLocationsCoordinates.push(locationCoordinates);
    });

    const featurecollection = points(regionLocationsCoordinates);
    const centerCoordinates = center(featurecollection);
    const distanceFromBK = distance(
      brooklynCoordinates,
      centerCoordinates.geometry.coordinates,
      { units: 'miles' }
    );

    regionsWithDistance.push({ regionName: region, distance: distanceFromBK });
  });

  return regionsWithDistance
    .sort((a, b) => a.distance - b.distance)
    .map(regionObject => regionObject.regionName);
};

export default locations => {
  locations.forEach(location => {
    const region = get(location, 'region', '');
    if (region === 'Brooklyn') {
      return locationSortedByGroup[BROOKLYN][region]
        ? locationSortedByGroup[BROOKLYN][region].push(location)
        : (locationSortedByGroup[BROOKLYN][region] = [location]);
    }
    if (get(location, 'state', '') === 'NY') {
      return locationSortedByGroup[FARTHER_FROM_BROOKLYN][region]
        ? locationSortedByGroup[FARTHER_FROM_BROOKLYN][region].push(location)
        : (locationSortedByGroup[FARTHER_FROM_BROOKLYN][region] = [location]);
    }
    return locationSortedByGroup[FARTHEST_FROM_BROOKLYN][region]
      ? locationSortedByGroup[FARTHEST_FROM_BROOKLYN][region].push(location)
      : (locationSortedByGroup[FARTHEST_FROM_BROOKLYN][region] = [location]);
  });

  regionOrder.fartherOrder = getRegionOrderedByDistanceFromBK(
    locationSortedByGroup[FARTHER_FROM_BROOKLYN]
  );
  regionOrder.farthestOrder = getRegionOrderedByDistanceFromBK(
    locationSortedByGroup[FARTHEST_FROM_BROOKLYN]
  );

  return { locationSortedByGroup, regionOrder };
};

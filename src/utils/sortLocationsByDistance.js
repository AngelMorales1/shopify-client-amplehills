import get from 'utils/get';
import distance from '@turf/distance';
import center from '@turf/center';
import { points } from '@turf/helpers';

const brooklynCoordinates = [-73.949997, 40.650002];

export default regions => {
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

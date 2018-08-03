import distance from '@turf/distance';
import { point } from '@turf/helpers';

export default (storeLat, storeLon, currentLat, currentLon) => {
  const from = point([currentLon, currentLat]);
  const to = point([storeLon, storeLat]);
  const options = { units: 'miles' };

  const distanceBetweenLocations = distance(from, to, options);

  const roundedDistance = Math.round(distanceBetweenLocations * 10) / 10;

  return roundedDistance;
};

import distance from '@turf/distance';
import { point } from '@turf/helpers';

export default (toLat, toLon, fromLat, fromLon) => {
  const to = point([toLon, toLat]);
  const from = point([fromLon, fromLat]);
  const options = { units: 'miles' };
  const distanceBetweenLocations = distance(from, to, options);
  const roundedDistance = Math.round(distanceBetweenLocations * 10) / 10;

  return roundedDistance;
};

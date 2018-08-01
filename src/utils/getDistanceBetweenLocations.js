
import distance from '@turf/distance';

// const straightAngle = 180;
// const minutesInADegree = 60;
// const nuticalMile = 1.1515;

export const getDistanceBetweenLocations = (storeLat, storeLon, currentLat, currentLon) => {
  // const radlat1 = (Math.PI * lat1) / straightAngle;
  // const radlat2 = (Math.PI * lat2) / straightAngle;
  // const theta = lon1 - lon2;
  // const radtheta = (Math.PI * theta) / straightAngle;
  // let dist =
  //   Math.sin(radlat1) * Math.sin(radlat2) +
  //   Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  // if (dist > 1) {
  //   dist = 1;
  // }

  // dist = Math.acos(dist);
  // dist = (dist * straightAngle) / Math.PI;
  // dist = dist * minutesInADegree * nuticalMile;
  
  // const roundedDistance = Math.round(dist * 10) / 10;

  // return roundedDistance;

  const from = [currentLat, currentLon];
  const to = [storeLat, storeLon];
  const options = {units: 'miles'};

  const distanceBetweenLocations = distance(from, to, options);

  const roundedDistance = Math.round(distanceBetweenLocations * 10) / 10;
  
  return roundedDistance;
};

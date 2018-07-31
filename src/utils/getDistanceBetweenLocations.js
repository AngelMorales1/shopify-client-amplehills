const straightAngle = 180;
const minutesInADegree = 60;
const nuticalMile = 1.1515;

export const getDistanceBetweenLocations = (lat1, lon1, lat2, lon2) => {
  const radlat1 = (Math.PI * lat1) / straightAngle;
  const radlat2 = (Math.PI * lat2) / straightAngle;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / straightAngle;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * straightAngle) / Math.PI;
  dist = dist * minutesInADegree * nuticalMile;

  return dist;
};

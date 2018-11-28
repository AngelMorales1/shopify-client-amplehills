import sortLocationsByDistance from 'utils/sortLocationsByDistance';
import get from 'utils/get';

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

  regionOrder.fartherOrder = sortLocationsByDistance(
    locationSortedByGroup[FARTHER_FROM_BROOKLYN]
  );
  regionOrder.farthestOrder = sortLocationsByDistance(
    locationSortedByGroup[FARTHEST_FROM_BROOKLYN]
  );

  return { locationSortedByGroup, regionOrder };
};

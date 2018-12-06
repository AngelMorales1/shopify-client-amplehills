import { createSelector } from 'reselect';
import locations from 'state/selectors/locations';
import sortLocationsByDistance from 'utils/sortLocationsByDistance';
import Regions from 'constants/Regions';

export default createSelector(
  state => locations(state),
  locations => {
    const regions = locations.reduce((locationsByRegions, location) => {
      let region = location.region;
      locationsByRegions[region] = locationsByRegions[region]
        ? locationsByRegions[region].concat([location])
        : [location];

      return locationsByRegions;
    }, {});
    const regionsSortedByDistance = sortLocationsByDistance(regions);
    const getSortedRegions = Regions.concat(regionsSortedByDistance);
    return getSortedRegions.reduce((locationsByRegions, region) => {
      if (!regions[region]) {
        return {
          ...locationsByRegions,
          [region]: []
        };
      }
      return {
        ...locationsByRegions,
        [region]: regions[region]
      };
    }, {});
  }
);

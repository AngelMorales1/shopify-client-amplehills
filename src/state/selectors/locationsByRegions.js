import { createSelector } from 'reselect';
import get from 'utils/get';
import locations from 'state/selectors/locations';
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

    return Regions.reduce((locationsByRegions, region) => {
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

import { createSelector } from 'reselect';
import get from 'utils/get';
import locations from 'state/selectors/locations';
import Regions from 'constants/Regions';

export default createSelector(
  state => locations(state),
  locations => {
    const regions = locations.reduce((accumulated, current) => {
      let region = current.region;
      accumulated[region] = accumulated[region]
        ? accumulated[region].concat([current])
        : [current];

      return accumulated;
    }, {});

    return Regions.reduce((accumulated, region) => {
      if (!regions[region]) {
        return {
          ...accumulated,
          [region]: []
        };
      }
      return {
        ...accumulated,
        [region]: regions[region]
      };
    }, {});
  }
);

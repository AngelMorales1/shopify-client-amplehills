import { createSelector } from 'reselect';
import locations from 'state/selectors/locations';

export default createSelector(
  state => locations(state),
  locations => {
    return locations.reduce((locationById, location) => {
      if (location.partyAvailable === true) {
        locationById[location.id] = location;
      }
      return locationById;
    }, {});
  }
);

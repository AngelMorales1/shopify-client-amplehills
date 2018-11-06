import { createSelector } from 'reselect';
import locations from 'state/selectors/locations';

export default createSelector(
  state => locations(state),
  locations =>
    locations.reduce((locationsById, location) => {
      if (!!location.cakeAvailable) locationsById[location.id] = location;
      return locationsById;
    }, {})
);

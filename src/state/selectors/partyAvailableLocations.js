import { createSelector } from 'reselect';
import get from 'utils/get';
import locations from 'state/selectors/locations';

export default createSelector(
  state => locations(state),
  locations => {
    return locations.filter(location => location.partyAvailable === true);
  }
);

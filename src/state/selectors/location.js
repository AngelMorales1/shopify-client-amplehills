import { createSelector } from 'reselect';
import get from 'utils/get';
import locations from 'state/selectors/locations';

export default createSelector(
  state => locations(state),
  (state, props) => get(props, 'match.params.locationId', ''),
  (locations, locationId) =>
    locations.find(location => location.slug === locationId)
);

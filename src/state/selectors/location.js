import { createSelector } from 'reselect';
import get from 'utils/get';
import getLocationUrl from 'utils/getLocationUrl';
import locations from 'state/selectors/locations';

export default createSelector(
  state => locations(state),
  (state, props) => get(props, 'match.params.locationTitle', ''),
  (locations, title) =>
    locations.find(location => {
      const locationTitle = getLocationUrl(location.title);

      return locationTitle === title;
    })
);

import { createSelector } from 'reselect';
import get from 'utils/get';

import locations from 'state/selectors/locations';

export default createSelector(
  state => locations(state),
  state => get(state, 'locationsUI.locationFilters', []),
  (locations, locationFilters) =>
    locations
      .filter(location => {
        return (
          locationFilters.length &&
          locationFilters.every(filter => location[filter.key] !== filter.value)
        );
      })
      .map(location => location.id)
);

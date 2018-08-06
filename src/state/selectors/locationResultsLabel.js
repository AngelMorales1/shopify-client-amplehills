import { createSelector } from 'reselect';
import get from 'utils/get';
import filteredLocations from 'state/selectors/filteredLocations';
import LocationsMapFilters from 'constants/LocationsMapFilters';

export default createSelector(
  state => filteredLocations(state),
  state => get(state, 'locationsUI.locationFilters', []),
  state => get(state, 'locationsUI.searchFilter'),
  (locations, stateFilter, searchFilter) => {
    const locationsText = locations.length === 1 ? 'Location' : 'Locations';

    const searchText = searchFilter ? ` for "${searchFilter}"` : '';
    const matchedState = stateFilter.length
      ? LocationsMapFilters.STATE_FILTERS[stateFilter[0].value]
      : null;
    const stateText = matchedState ? ` in ${matchedState.label}` : '';
    const filterText = stateText.concat(searchText);

    return `${locations.length} ${locationsText}${filterText}`;
  }
);

import LocationsMapFilters from 'constants/LocationsMapFilters';

export default (locationsLength, stateFilter, searchFilter) => {
  const locationsText = locationsLength === 1 ? 'Location' : 'Locations';

  const searchText = searchFilter ? ` for "${searchFilter}"` : '';
  const matchedState = stateFilter.length
    ? LocationsMapFilters.STATE_FILTERS.find(
        filter => filter.value === stateFilter[0].value
      )
    : null;
  const stateText = matchedState ? ` in ${matchedState.label}` : '';
  const filterText = stateText.concat(searchText);

  return `${locationsLength} ${locationsText}${filterText}`;
};

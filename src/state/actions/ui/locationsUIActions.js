export const ADD_LOCATION_FILTER = 'ADD_LOCATION_FILTER';
export const addLocationFilter = filter => {
  return {
    type: ADD_LOCATION_FILTER,
    payload: filter
  };
};

export const REMOVE_LOCATION_FILTER = 'REMOVE_LOCATION_FILTER';
export const removeLocationFilter = filter => {
  return {
    type: REMOVE_LOCATION_FILTER,
    payload: filter
  };
};

export const CLEAR_LOCATION_FILTERS = 'CLEAR_LOCATION_FILTERS';
export const clearLocationFilters = filter => {
  return {
    type: CLEAR_LOCATION_FILTERS
  };
};

export const UPDATE_SEARCH_FILTER = 'UPDATE_SEARCH_FILTER';
export const updateSearchFilter = value => {
  return {
    type: UPDATE_SEARCH_FILTER,
    payload: value
  };
};

export const SELECT_LOCATION = 'SELECT_LOCATION';
export const selectLocation = location => {
  return {
    type: SELECT_LOCATION,
    payload: location
  };
};

export const CLEAR_LOCATION_SELECTION = 'CLEAR_LOCATION_SELECTION';
export const clearLocationSelection = () => {
  return {
    type: CLEAR_LOCATION_SELECTION
  };
};

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

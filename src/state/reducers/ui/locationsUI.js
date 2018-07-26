import {
  ADD_LOCATION_FILTER,
  REMOVE_LOCATION_FILTER,
  CLEAR_LOCATION_FILTERS
} from 'state/actions/ui/locationsUIActions';

const initialState = {
  locationFilters: []
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ADD_LOCATION_FILTER:
      return {
        ...state,
        locationFilters: [action.payload]
      };
    case REMOVE_LOCATION_FILTER:
      const { key, value } = action.payload;
      return {
        ...state,
        locationFilters: state.locationFilters.filter(filter => {
          return filter.key !== key || filter.value !== value;
        })
      };
    case CLEAR_LOCATION_FILTERS:
      const { locationFilters } = initialState;
      return {
        ...state,
        locationFilters
      };
    default:
      return state;
  }
};

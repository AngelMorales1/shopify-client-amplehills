import get from 'utils/get';
import {
  ADD_LOCATION_FILTER,
  REMOVE_LOCATION_FILTER,
  CLEAR_LOCATION_FILTERS,
  UPDATE_SEARCH_FILTER,
  SELECT_LOCATION,
  CLEAR_LOCATION_SELECTION
} from 'state/actions/ui/locationsUIActions';

const initialState = {
  locationFilters: [],
  searchFilter: '',
  selectedLocation: null
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
    case UPDATE_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: action.payload
      };
    case SELECT_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload
      };
    case CLEAR_LOCATION_SELECTION:
      const { selectedLocation } = initialState;
      return {
        ...state,
        selectedLocation
      };
    default:
      return state;
  }
};

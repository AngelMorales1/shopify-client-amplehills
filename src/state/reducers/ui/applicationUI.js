import { GET_LOCATION_DATA } from 'state/actions/ui/applicationUIActions';

const initialState = {
  locations: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_LOCATION_DATA}_FULFILLED`:
      return {
        ...state,
        locations: action.payload
      };
    default:
      return state;
  }
};

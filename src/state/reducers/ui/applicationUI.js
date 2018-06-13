import { GET_LOCATION_DATA } from 'state/actions/ui/applicationUIActions';

const initialState = {
  locations: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  console.log(action.type);
  switch (type) {
    case `${GET_LOCATION_DATA}_FULFILLED`:
      console.log({
        ...state,
        locations: action.payload
      });
      return {
        ...state,
        locations: action.payload
      };
    default:
      return state;
  }
};

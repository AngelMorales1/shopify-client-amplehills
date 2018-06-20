import {
  GET_LOCATION_DATA,
  GET_GLOBAL_SETTINGS,
  GET_OUR_PLEDGE
} from 'state/actions/ui/applicationUIActions';

const initialState = {
  locations: {},
  globalSettings: {},
  ourPledge: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_LOCATION_DATA}_FULFILLED`:
      return {
        ...state,
        locations: action.payload
      };
    case `${GET_GLOBAL_SETTINGS}_FULFILLED`:
      return {
        ...state,
        globalSettings: action.payload
      };
    case `${GET_OUR_PLEDGE}_FULFILLED`:
      return {
        ...state,
        ourPledge: action.payload
      };
    default:
      return state;
  }
};

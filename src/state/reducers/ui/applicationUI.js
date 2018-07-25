import { GET_GLOBAL_SETTINGS } from 'state/actions/ui/applicationUIActions';

const initialState = {
  globalSettings: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_GLOBAL_SETTINGS}_FULFILLED`:
      return {
        ...state,
        globalSettings: action.payload
      };
    default:
      return state;
  }
};

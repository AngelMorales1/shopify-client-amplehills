import {
  GET_GLOBAL_SETTINGS,
  GET_PRIVACY_POLICY
} from 'state/actions/ui/applicationUIActions';

const initialState = {
  globalSettings: {},
  privacyPolicy: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_GLOBAL_SETTINGS}_FULFILLED`:
      return {
        ...state,
        globalSettings: action.payload
      };
    case `${GET_PRIVACY_POLICY}_FULFILLED`:
      return {
        ...state,
        privacyPolicy: action.payload
      };
    default:
      return state;
  }
};

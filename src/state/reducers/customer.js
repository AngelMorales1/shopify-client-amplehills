import {
  FETCH_CUSTOMER,
  SIGN_IN_CUSTOMER,
  SIGN_OUT_CUSTOMER,
  UPDATE_CUSTOMER
} from 'state/actions/customerActions';

const initialState = {
  id: ''
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_CUSTOMER}_FULFILLED`:
      return {
        ...state,
        ...action.payload
      };
    case `${SIGN_IN_CUSTOMER}_FULFILLED`:
      return {
        ...state,
        accessToken: action.payload
      };
    case `${SIGN_IN_CUSTOMER}_REJECTED`:
      return {
        ...state,
        error: action.payload
      };
    case SIGN_OUT_CUSTOMER:
      return initialState;
    case `${UPDATE_CUSTOMER}_FULFILLED`:
      const { accessToken, customer } = action.payload;
      return {
        ...state,
        ...customer,
        accessToken
      };
    default:
      return state;
  }
};

import {
  FETCH_CUSTOMER,
  SIGN_IN_CUSTOMER,
  SIGN_OUT_CUSTOMER
} from 'state/actions/customerActions';

const initialState = {
  id: ''
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_CUSTOMER}_FULFILLED`:
      return action.payload;
    case `${SIGN_IN_CUSTOMER}_REJECTED`:
      console.log('rehected');
      return {
        ...state,
        error: action.payload
      };
    case SIGN_OUT_CUSTOMER:
      return initialState;
    default:
      return state;
  }
};

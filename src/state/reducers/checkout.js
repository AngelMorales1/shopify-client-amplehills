import { CREATE_CHECKOUT } from 'state/actions/checkoutActions';

const initialState = {};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${CREATE_CHECKOUT}_FULFILLED`:
      return action.payload;
    default:
      return state;
  }
};

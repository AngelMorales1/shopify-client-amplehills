import { FETCH_PRODUCT } from "state/actions/productActions";

const initialState = {};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_PRODUCT}_FULFILLED`:
      return action.payload;
    default:
      return state;
  }
};

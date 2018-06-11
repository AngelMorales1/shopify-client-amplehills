import { FETCH_PRODUCT_CONTENT } from "state/actions/contentActions";

const initialState = {};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_PRODUCT_CONTENT}_FULFILLED`:
      return action.payload;
    default:
      return state;
  }
};

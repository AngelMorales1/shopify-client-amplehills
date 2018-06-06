import { FETCH_PRODUCTS } from "state/actions/productsActions";

const initialState = [];

export default (state = initialState, action) => {
  const { type } = action;
  console.log(action);
  switch (type) {
    case `${FETCH_PRODUCTS}_FULFILLED`:
      return action.payload;
    default:
      return state;
  }
};

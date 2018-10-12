import { FETCH_WHOLESALE_SHOPIFY_PRODUCTS } from 'state/actions/wholesaleActions';

const initialState = {
  wholesaleProducts: []
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_WHOLESALE_SHOPIFY_PRODUCTS}_FULFILLED`:
      return {
        ...state,
        wholesaleProducts: action.payload
      };
    default:
      return state;
  }
};

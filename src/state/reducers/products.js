import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT_LANDING
} from 'state/actions/productsActions';

const initialState = {
  products: [],
  productLanding: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_PRODUCTS}_FULFILLED`:
      return {
        ...state,
        products: action.payload
      };
    case `${FETCH_PRODUCT_LANDING}_FULFILLED`:
      return {
        ...state,
        productLanding: action.payload
      };
    default:
      return state;
  }
};

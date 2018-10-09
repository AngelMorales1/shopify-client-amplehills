import {
  FETCH_SHOPIFY_PRODUCTS,
  FETCH_CONTENTFUL_PRODUCTS,
  FETCH_CONTENTFUL_MERCH,
  FETCH_PRODUCT_LANDING
} from 'state/actions/productsActions';

const initialState = {
  products: [],
  contentfulProducts: {},
  contentfulMerch: {},
  productLanding: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_SHOPIFY_PRODUCTS}_FULFILLED`:
      return {
        ...state,
        products: action.payload
      };
    case `${FETCH_CONTENTFUL_PRODUCTS}_FULFILLED`:
      return {
        ...state,
        contentfulProducts: action.payload
      };
    case `${FETCH_CONTENTFUL_MERCH}_FULFILLED`:
      return {
        ...state,
        contentfulMerch: action.payload
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

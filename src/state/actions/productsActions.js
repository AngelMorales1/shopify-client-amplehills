import Data from 'lib/Data';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const fetchProducts = payload => dispatch => {
  return dispatch({
    type: FETCH_PRODUCTS,
    payload: Data.fetchProducts()
  });
};

export const FETCH_PRODUCT_LANDING = 'FETCH_PRODUCT_LANDING';
export const fetchProductLanding = payload => dispatch => {
  return dispatch({
    type: FETCH_PRODUCT_LANDING,
    payload: Data.fetchProductLanding()
  });
};

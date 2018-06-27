import Data from 'lib/Data';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const fetchProducts = payload => dispatch => {
  return dispatch({
    type: FETCH_PRODUCTS,
    payload: Data.fetchProducts()
  });
};

export const FETCH_CONTENTFUL_PRODUCTS = 'FETCH_CONTENTFUL_PRODUCTS';
export const fetchContentfulProducts = payload => dispatch => {
  return dispatch({
    type: FETCH_CONTENTFUL_PRODUCTS,
    payload: Data.getEntries({
      content_type: 'productPage',
      include: 4
    })
  });
};

export const FETCH_PRODUCT_LANDING = 'FETCH_PRODUCT_LANDING';
export const fetchProductLanding = payload => dispatch => {
  return dispatch({
    type: FETCH_PRODUCT_LANDING,
    payload: Data.fetchProductLanding()
  });
};

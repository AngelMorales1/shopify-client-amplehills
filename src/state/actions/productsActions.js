import Data from 'lib/Data';
import { client as Apollo } from 'lib/Apollo';

import { fetchProducts } from 'state/graphql/products';

export const FETCH_SHOPIFY_PRODUCTS = 'FETCH_SHOPIFY_PRODUCTS';
export const fetchShopifyProducts = payload => dispatch => {
  return dispatch({
    type: FETCH_SHOPIFY_PRODUCTS,
    payload: Apollo.query({
      query: fetchProducts
    })
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
    payload: Data.getEntries({
      content_type: 'productLanding',
      include: 4
    })
  });
};

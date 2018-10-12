import Data from 'lib/Data';
import { client as Apollo } from 'lib/Apollo';

import { fetchWholesaleProducts } from 'state/graphql/wholesale';

export const FETCH_WHOLESALE_SHOPIFY_PRODUCTS =
  'FETCH_WHOLESALE_SHOPIFY_PRODUCTS';
export const fetchShopifyWholesaleProducts = payload => dispatch => {
  return dispatch({
    type: FETCH_WHOLESALE_SHOPIFY_PRODUCTS,
    payload: Apollo.query({
      query: fetchWholesaleProducts
    })
  });
};

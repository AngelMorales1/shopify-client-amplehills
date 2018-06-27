import Data from 'lib/Data';
import ContentfulClient from 'lib/Contentful';
import BuySDK from 'lib/Buy';
import {
  getLocationData,
  getGlobalSettings
} from 'state/actions/ui/applicationUIActions';

import {
  fetchProducts,
  fetchContentfulProducts
} from 'state/actions/productsActions';

import { fetchOrCreateCheckout } from 'state/actions/checkoutActions';

export const INITIALIZE_APPLICATION = 'INITIALIZE_APPLICATION';
export const initializeApplication = checkoutID => dispatch => {
  return dispatch({
    type: INITIALIZE_APPLICATION,
    payload: new Promise(resolve => {
      const Contentful = ContentfulClient();
      Data.setRef('contentful', Contentful);
      Data.setRef('shopify', BuySDK);
      return Promise.all([
        fetchOrCreateCheckout(checkoutID)(dispatch),
        getLocationData()(dispatch),
        getGlobalSettings()(dispatch),
        fetchProducts()(dispatch),
        fetchContentfulProducts()(dispatch)
      ]).then(([checkout, locations, settings, products, contentfulProducts]) =>
        resolve()
      );
    })
  });
};

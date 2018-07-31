import Data from 'lib/Data';
import ContentfulClient from 'lib/Contentful';
import { getGlobalSettings } from 'state/actions/ui/applicationUIActions';
import { getLocationData } from 'state/actions/locationsActions';

import {
  fetchShopifyProducts,
  fetchContentfulProducts
} from 'state/actions/productsActions';

import { fetchOrCreateCheckout } from 'state/actions/checkoutActions';

export const INITIALIZE_APPLICATION = 'INITIALIZE_APPLICATION';
export const initializeApplication = checkoutID => dispatch => {
  return dispatch({
    type: INITIALIZE_APPLICATION,
    payload: new Promise((resolve, reject) => {
      const Contentful = ContentfulClient();
      Data.setRef('contentful', Contentful);
      return Promise.all([
        fetchOrCreateCheckout(checkoutID)(dispatch),
        getLocationData()(dispatch),
        getGlobalSettings()(dispatch),
        fetchShopifyProducts()(dispatch),
        fetchContentfulProducts()(dispatch)
      ])
        .then(([checkout, locations, settings, products, contentfulProducts]) =>
          resolve()
        )
        .catch(err => reject(err));
    })
  });
};

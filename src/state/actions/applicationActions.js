import Data from 'lib/Data';
import ContentfulClient, { PreviewClient } from 'lib/Contentful';
import { getGlobalSettings } from 'state/actions/ui/applicationUIActions';
import { getLocationData } from 'state/actions/locationsActions';

import {
  fetchShopifyProducts,
  fetchContentfulProducts
} from 'state/actions/productsActions';

import { fetchOrCreateCheckout } from 'state/actions/checkoutActions';

export const INITIALIZE_APPLICATION = 'INITIALIZE_APPLICATION';
export const initializeApplication = (checkoutID, isPreview) => dispatch => {
  return dispatch({
    type: INITIALIZE_APPLICATION,
    payload: new Promise((resolve, reject) => {
      const Contentful = isPreview ? PreviewClient() : ContentfulClient();
      Data.setRef('contentful', Contentful);
      const fetchData = Promise.all([
        dispatch(fetchOrCreateCheckout(checkoutID)),
        dispatch(getLocationData()),
        dispatch(getGlobalSettings()),
        dispatch(fetchShopifyProducts()),
        dispatch(fetchContentfulProducts())
      ]);
      const timeout = new Promise((resolve, reject) => {
        setTimeout(() => reject('Timeout'), 10000);
      });
      const checkTimeout = Promise.race([fetchData, timeout]);

      return checkTimeout
        .then(([checkout, locations, settings, products, contentfulProducts]) =>
          resolve()
        )
        .catch(err => reject(err));
    })
  });
};

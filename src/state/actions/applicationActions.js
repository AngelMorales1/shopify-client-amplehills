import Data from 'lib/Data';
import ContentfulClient, { PreviewClient } from 'lib/Contentful';
import { getGlobalSettings } from 'state/actions/ui/applicationUIActions';
import { getLocationData } from 'state/actions/locationsActions';

import {
  fetchShopifyProducts,
  fetchContentfulProducts,
  fetchContentfulMerch
} from 'state/actions/productsActions';
import { getEvents } from 'state/actions/eventsActions';
import { getFlavors } from 'state/actions/flavorsActions';

export const INITIALIZE_APPLICATION = 'INITIALIZE_APPLICATION';
export const initializeApplication = (checkoutID, isPreview) => dispatch => {
  return dispatch({
    type: INITIALIZE_APPLICATION,
    payload: new Promise((resolve, reject) => {
      const Contentful = isPreview ? PreviewClient() : ContentfulClient();
      Data.setRef('contentful', Contentful);
      const fetchData = Promise.all([
        dispatch(getLocationData()),
        dispatch(getGlobalSettings()),
        dispatch(fetchShopifyProducts()),
        dispatch(fetchContentfulProducts()),
        dispatch(fetchContentfulMerch()),
        dispatch(getFlavors())
      ]);
      const timeout = new Promise((resolve, reject) => {
        setTimeout(() => reject('Timeout'), 10000);
      });
      const checkTimeout = Promise.race([fetchData, timeout]);

      return checkTimeout
        .then(
          ([
            checkout,
            locations,
            settings,
            products,
            contentfulProducts,
            fetchContentfulMerch,
            getFlavors
          ]) => resolve()
        )
        .catch(err => reject(err));
    })
  });
};

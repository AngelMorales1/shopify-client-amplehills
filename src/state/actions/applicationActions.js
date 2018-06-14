import Data from 'lib/Data';
import ContentfulClient from 'lib/Contentful';
import BuySDK from 'lib/Buy';

import { getCheckout } from 'state/actions/checkoutActions';

export const INITIALIZE_APPLICATION = 'INITIALIZE_APPLICATION';
export const initializeApplication = payload => dispatch => {
  return dispatch({
    type: INITIALIZE_APPLICATION,
    payload: new Promise(resolve => {
      const Contentful = ContentfulClient();
      Data.setRef('contentful', Contentful);
      Data.setRef('shopify', BuySDK);

      dispatch(getCheckout(payload));

      resolve(Contentful);
    })
  });
};

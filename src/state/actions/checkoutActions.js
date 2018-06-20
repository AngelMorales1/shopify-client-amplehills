import BuySDK from 'lib/Buy';
import get from 'utils/get';

import { openMiniCart } from 'state/actions/ui/miniCartUIActions';

export const FETCH_OR_CREATE_CHECKOUT = 'FETCH_OR_CREATE_CHECKOUT';
export const fetchOrCreateCheckout = checkoutID => dispatch => {
  return dispatch({
    type: FETCH_OR_CREATE_CHECKOUT,
    payload: new Promise(resolve => {
      if (!checkoutID)
        return dispatch(createCheckout()).then(checkout => resolve(checkout));

      return dispatch(fetchCheckout(checkoutID)).then(checkout =>
        resolve(checkout)
      );
    })
  });
};

export const FETCH_CHECKOUT = 'FETCH_CHECKOUT';
export const fetchCheckout = checkoutID => dispatch => {
  return dispatch({
    type: FETCH_CHECKOUT,
    payload: new Promise(resolve => {
      return BuySDK.checkout.fetch(checkoutID).then(checkout => {
        if (get(checkout, 'completedAt', false))
          return dispatch(createCheckout()).then(checkout => resolve(checkout));

        resolve(checkout);
      });
    })
  });
};

export const CREATE_CHECKOUT = 'CREATE_CHECKOUT';
export const createCheckout = () => dispatch => {
  return dispatch({
    type: CREATE_CHECKOUT,
    payload: BuySDK.checkout.create()
  });
};

export const ADD_LINE_ITEMS = 'ADD_LINE_ITEMS';
export const addLineItems = (checkoutID, items) => dispatch => {
  return dispatch({
    type: ADD_LINE_ITEMS,
    payload: BuySDK.checkout.addLineItems(checkoutID, items)
  }).then(() => dispatch(openMiniCart()));
};

export const REMOVE_LINE_ITEMS = 'REMOVE_LINE_ITEMS';
export const removeLineItems = (checkoutID, items) => dispatch => {
  return dispatch({
    type: REMOVE_LINE_ITEMS,
    payload: BuySDK.checkout.removeLineItems(checkoutID, items)
  });
};

export const UPDATE_LINE_ITEMS = 'UPDATE_LINE_ITEMS';
export const updateLineItems = (checkoutID, items) => dispatch => {
  return dispatch({
    type: UPDATE_LINE_ITEMS,
    meta: { id: get(items, '[0].id', '') },
    payload: BuySDK.checkout.updateLineItems(checkoutID, items)
  });
};

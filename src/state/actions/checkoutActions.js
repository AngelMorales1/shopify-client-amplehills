import BuySDK from 'lib/Buy';
import get from 'utils/get';

import { openCart } from 'state/actions/ui/cartUIActions';

export const GET_CHECKOUT = 'GET_CHECKOUT';
export const getCheckout = checkoutID => dispatch => {
  return dispatch({
    type: GET_CHECKOUT,
    payload: new Promise(resolve => {
      if (!checkoutID) resolve(dispatch(createCheckout()));

      resolve(fetchCheckout(checkoutID));
    })
  });
};

export const FETCH_CHECKOUT = 'FETCH_CHECKOUT';
export const fetchCheckout = checkoutID => dispatch => {
  return dispatch({
    type: FETCH_CHECKOUT,
    payload: new Promise(resolve => {
      return BuySDK.checkout.fetch(checkoutID).then(res => {
        const checkout = res;
        if (get(checkout, 'completedAt', false))
          resolve(dispatch(createCheckout()));

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
  }).then(() => dispatch(openCart()));
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

import BuySDK from 'lib/Buy';
import get from 'utils/get';

import { openCart } from 'state/actions/ui/cartUIActions';

export const GET_CHECKOUT = 'GET_CHECKOUT';
export const getCheckout = checkoutID => dispatch => {
  if (!checkoutID) return dispatch(createCheckout());

  return dispatch(fetchCheckout(checkoutID)).then(() => {
    return dispatch({
      type: GET_CHECKOUT,
      payload: new Promise(resolve => resolve())
    });
  });
};

export const FETCH_CHECKOUT = 'FETCH_CHECKOUT';
export const fetchCheckout = checkoutID => dispatch => {
  return BuySDK.checkout.fetch(checkoutID).then(res => {
    const checkout = res;
    if (get(checkout, 'completedAt', false)) return dispatch(createCheckout());

    return dispatch({
      type: FETCH_CHECKOUT,
      payload: new Promise(resolve => resolve())
    });
  });
};

export const CREATE_CHECKOUT = 'CREATE_CHECKOUT';
export const createCheckout = payload => dispatch => {
  return dispatch({
    type: CREATE_CHECKOUT,
    payload: BuySDK.checkout.create()
  });
};

export const ADD_LINE_ITEMS = 'ADD_LINE_ITEMS';
export const addLineItems = (checkoutID, items) => dispatch => {
  return BuySDK.checkout.addLineItems(checkoutID, items).then(checkout => {
    dispatch(openCart());

    return dispatch({
      type: ADD_LINE_ITEMS,
      payload: new Promise(resolve => resolve(checkout))
    });
  });
};

import BuySDK from 'lib/Buy';
import get from 'utils/get';

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

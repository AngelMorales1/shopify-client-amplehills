import BuySDK from 'lib/Buy';
import get from 'utils/get';

export const GET_CHECKOUT = 'GET_CHECKOUT';
export const getCheckout = payload => dispatch => {
  if (!payload) return dispatch(createCheckout());

  BuySDK.checkout.fetch(payload).then(res => {
    const checkout = res;
    if (get(checkout, 'completedAt', false)) return dispatch(createCheckout());
  });

  return dispatch({
    type: GET_CHECKOUT,
    payload: new Promise(resolve => resolve())
  });
};

export const CREATE_CHECKOUT = 'CREATE_CHECKOUT';
export const createCheckout = payload => dispatch => {
  return dispatch({
    type: CREATE_CHECKOUT,
    payload: new Promise((resolve, reject) => {
      BuySDK.checkout.create().then(res => {
        const checkout = res;
        if (!checkout.id) reject(new Error('Error creating checkout'));

        resolve(checkout);
      });
    })
  });
};

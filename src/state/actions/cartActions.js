import BuySDK from 'lib/Buy';

export const GET_CHECKOUT = 'GET_CHECKOUT';
export const getCheckout = payload => dispatch => {
  if (!payload) return dispatch(createCheckout());
  return dispatch({
    type: GET_CHECKOUT,
    payload: () => {}
  });
};

export const CREATE_CHECKOUT = 'CREATE_CHECKOUT';
export const createCheckout = payload => dispatch => {
  return dispatch({
    type: CREATE_CHECKOUT,
    payload: new Promise((resolve, reject) => {
      BuySDK.checkout.create().then(res => {
        const checkout = res;
        console.log(checkout);
        // if (!collection.handle || collection.handle !== payload)
        //   reject(new Error("No Collections"));

        resolve(checkout);
      });
    })
  });
};

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const addProduct = payload => dispatch => {
  return dispatch({
    type: ADD_PRODUCT,
    payload: new Promise((resolve, reject) => {
      BuySDK.checkout.addProduct(payload).then(res => {
        const collection = res;
        if (!collection.handle || collection.handle !== payload)
          reject(new Error('No Collections'));

        resolve(collection);
      });
    })
  });
};

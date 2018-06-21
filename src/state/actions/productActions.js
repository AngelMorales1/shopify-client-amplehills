import Data from 'lib/Data';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const fetchProduct = payload => dispatch => {
  return dispatch({
    type: FETCH_PRODUCT,
    payload: new Promise((resolve, reject) => {
      Data.fetchByHandle(payload).then(res => {
        const product = res;

        if (!product.handle || product.handle !== payload)
          reject(new Error('No Products'));

        resolve(product);
      });
    })
  });
};

export const GET_OUR_PLEDGE = 'GET_OUR_PLEDGE';
export const getOurPledge = payload => {
  return {
    type: `GET_OUR_PLEDGE`,
    payload: Data.getOurPledge()
  };
};

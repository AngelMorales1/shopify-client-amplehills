import BuySDK from "lib/Buy";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProducts = payload => dispatch => {
  return dispatch({
    type: FETCH_PRODUCTS,
    payload: new Promise((resolve, reject) => {
      BuySDK.product.fetchAll().then(res => {
        const products = res;
        if (!products.length) reject(new Error("No Products"));

        resolve(products);
      });
    })
  });
};

export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const fetchProduct = payload => dispatch => {
  return dispatch({
    type: FETCH_PRODUCT,
    payload: new Promise((resolve, reject) => {
      BuySDK.product.fetchByHandle(payload).then(res => {
        const product = res;
        if (!product.handle || product.handle !== payload)
          reject(new Error("No Products"));

        resolve(product);
      });
    })
  });
};

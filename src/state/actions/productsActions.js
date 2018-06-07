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

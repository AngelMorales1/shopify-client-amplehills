import Data from "lib/Data";

export const FETCH_PRODUCT_CONTENT = "FETCH_PRODUCT_CONTENT";
export const fetchProductContent = payload => dispatch => {
  return dispatch({
    type: FETCH_PRODUCT_CONTENT,
    payload: new Promise((resolve, reject) => {
      Data.getEntries("productPage", payload).then(res => {
        const product = res;
        if (!res) reject(new Error("No Products"));

        resolve(product);
      });
    })
  });
};

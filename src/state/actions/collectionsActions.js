import BuySDK from "lib/Buy";

export const FETCH_COLLECTIONS = "FETCH_COLLECTIONS";
export const fetchCollections = payload => dispatch => {
  return dispatch({
    type: FETCH_COLLECTIONS,
    payload: new Promise((resolve, reject) => {
      BuySDK.collection.fetchAll().then(res => {
        const collections = res;
        if (!collections.length) reject(new Error("No Collections"));

        resolve(collections);
      });
    })
  });
};

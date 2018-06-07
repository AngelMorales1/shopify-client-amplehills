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

export const FETCH_COLLECTION = "FETCH_COLLECTION";
export const fetchCollection = payload => dispatch => {
  return dispatch({
    type: FETCH_COLLECTION,
    payload: new Promise((resolve, reject) => {
      BuySDK.collection.fetchByHandle(payload).then(res => {
        const collection = res;
        if (!collection.handle || collection.handle !== payload)
          reject(new Error("No Collections"));

        resolve(collection);
      });
    })
  });
};

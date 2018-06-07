import { FETCH_COLLECTION } from "state/actions/collectionActions";

const initialState = {};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_COLLECTION}_FULFILLED`:
      return action.payload;
    default:
      return state;
  }
};

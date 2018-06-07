import { FETCH_COLLECTIONS } from "state/actions/collectionsActions";

const initialState = [];

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_COLLECTIONS}_FULFILLED`:
      return action.payload;
    default:
      return state;
  }
};

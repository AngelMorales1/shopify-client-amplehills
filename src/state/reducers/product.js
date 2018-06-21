import { FETCH_PRODUCT, GET_OUR_PLEDGE } from 'state/actions/productActions';

const initialState = {
  ourPledge: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_PRODUCT}_FULFILLED`:
      return action.payload;
    case `${GET_OUR_PLEDGE}_FULFILLED`:
      return {
        ...state,
        ourPledge: action.payload
      };
    default:
      return state;
  }
};

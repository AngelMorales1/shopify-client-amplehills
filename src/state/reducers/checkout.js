import {
  CREATE_CHECKOUT,
  ADD_LINE_ITEMS,
  REMOVE_LINE_ITEMS,
  UPDATE_LINE_ITEMS
} from 'state/actions/checkoutActions';

const initialState = {};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${CREATE_CHECKOUT}_FULFILLED`:
    case `${ADD_LINE_ITEMS}_FULFILLED`:
    case `${REMOVE_LINE_ITEMS}_FULFILLED`:
    case `${UPDATE_LINE_ITEMS}_FULFILLED`:
      return action.payload;
    default:
      return state;
  }
};

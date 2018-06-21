import {
  OPEN_MINI_CART,
  CLOSE_MINI_CART
} from 'state/actions/ui/miniCartUIActions';

const initialState = {
  miniCartIsOpen: false,
  lineItemsBeingRemoved: []
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_MINI_CART:
    case CLOSE_MINI_CART:
      return {
        ...state,
        miniCartIsOpen: action.payload
      };
    default:
      return state;
  }
};

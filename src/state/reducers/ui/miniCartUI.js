import {
  OPEN_MINI_CART,
  CLOSE_MINI_CART,
  OPEN_DELETE_MODAL,
  CLOSE_DELETE_MODAL
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
    case OPEN_DELETE_MODAL:
    case CLOSE_DELETE_MODAL:
      return {
        ...state,
        lineItemsBeingRemoved: action.payload
      };
    default:
      return state;
  }
};

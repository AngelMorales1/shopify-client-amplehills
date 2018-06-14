import { OPEN_CART, CLOSE_CART } from 'state/actions/ui/cartUIActions';

const initialState = {
  cartIsOpen: false
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_CART:
    case CLOSE_CART:
      return {
        ...state,
        cartIsOpen: action.payload
      };
    default:
      return state;
  }
};

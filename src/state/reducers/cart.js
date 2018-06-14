import { OPEN_CART, CLOSE_CART } from 'state/actions/cartActions';

const initialState = {
  isCartOpen: false
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_CART:
    case CLOSE_CART:
      return {
        ...state,
        isCartOpen: action.payload
      };
    default:
      return state;
  }
};

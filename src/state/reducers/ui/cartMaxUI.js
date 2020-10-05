import {
  OPEN_CART_MAX,
  CLOSE_CART_MAX
} from 'state/actions/ui/cartMaxUIActions';

const initialState = {
  cartMaxIsActive: false
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_CART_MAX:
    case CLOSE_CART_MAX:
      return {
        ...state,
        cartMaxIsActive: action.payload
      };
    default:
      return state;
  }
};

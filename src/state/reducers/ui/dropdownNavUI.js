import {
  OPEN_SHOP_ONLINE,
  CLOSE_SHOP_ONLINE
} from 'state/actions/ui/dropdownNavUIActions';

const initialState = {
  shopOnlineIsOpen: false
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_SHOP_ONLINE:
    case CLOSE_SHOP_ONLINE:
      return {
        ...state,
        shopOnlineIsOpen: action.payload
      };
    default:
      return state;
  }
};

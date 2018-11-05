import {
  OPEN_SHOP_DROPDOWN,
  CLOSE_SHOP_DROPDOWN
} from 'state/actions/ui/dropdownNavUIActions';

const initialState = {
  shopDropdownIsOpen: false
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_SHOP_DROPDOWN:
    case CLOSE_SHOP_DROPDOWN:
      return {
        ...state,
        shopDropdownIsOpen: action.payload
      };
    default:
      return state;
  }
};

import {
  OPEN_SHOP_DROPDOWN,
  CLOSE_SHOP_DROPDOWN,
  OPEN_LOCATION_DROPDOWN,
  CLOSE_LOCATION_DROPDOWN
} from 'state/actions/ui/dropdownNavUIActions';
const initialState = {
  shopDropdownIsOpen: false,
  locationDropdownIsOpen: false
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
    case OPEN_LOCATION_DROPDOWN:
    case CLOSE_LOCATION_DROPDOWN:
      return {
        ...state,
        locationDropdownIsOpen: action.payload
      };
    default:
      return state;
  }
};

import {
  OPEN_MOBILE_NAV,
  CLOSE_MOBILE_NAV
} from 'state/actions/ui/mobileNavUIActions';

const initialState = {
  mobileNavIsOpen: false
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_MOBILE_NAV:
    case CLOSE_MOBILE_NAV:
      return {
        ...state,
        mobileNavIsOpen: action.payload
      };
    default:
      return state;
  }
};

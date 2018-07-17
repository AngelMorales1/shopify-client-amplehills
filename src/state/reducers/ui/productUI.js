import {
  OPEN_OUR_PLEDGE,
  CLOSE_OUR_PLEDGE
} from 'state/actions/ui/productUIActions';

const initialState = {
  ourPledgeOverlayIsOpen: false
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_OUR_PLEDGE:
    case CLOSE_OUR_PLEDGE:
      const { ourPledgeOverlayIsOpen } = action;
      return {
        ...state,
        ourPledgeOverlayIsOpen
      };
    default:
      return state;
  }
};

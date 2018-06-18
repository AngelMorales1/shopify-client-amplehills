import { FULFILLED, IDLE, PENDING, REJECTED } from 'constants/Status';
import { INITIALIZE_APPLICATION } from 'state/actions/applicationActions';
import { UPDATE_LINE_ITEMS } from 'state/actions/checkoutActions';

const initialState = {
  initializeApplication: IDLE,
  lineItemsBeingUpdated: []
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${INITIALIZE_APPLICATION}_PENDING`:
      return { ...state, initializeApplication: PENDING };
    case `${INITIALIZE_APPLICATION}_FULFILLED`:
      return { ...state, initializeApplication: FULFILLED };
    case `${INITIALIZE_APPLICATION}_REJECTED`:
      return { ...state, initializeApplication: REJECTED };

    case `${UPDATE_LINE_ITEMS}_PENDING`:
      return {
        ...state,
        lineItemsBeingUpdated: state.lineItemsBeingUpdated.concat(
          action.meta.id
        )
      };
    case `${UPDATE_LINE_ITEMS}_FULFILLED`:
      return {
        ...state,
        lineItemsBeingUpdated: state.lineItemsBeingUpdated.filter(
          item => item !== action.meta.id
        )
      };

    default:
      return state;
  }
};

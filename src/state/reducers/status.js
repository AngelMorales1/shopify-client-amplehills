import { FULFILLED, IDLE, PENDING, REJECTED } from 'constants/Status';
import { INITIALIZE_APPLICATION } from 'state/actions/applicationActions';
import {
  ADD_LINE_ITEMS,
  UPDATE_LINE_ITEMS,
  REMOVE_LINE_ITEMS,
  CANCEL_REMOVE_LINE_ITEMS
} from 'state/actions/checkoutActions';

const initialState = {
  initializeApplication: IDLE,
  addLineItemsStatus: IDLE,
  lineItemsBeingUpdated: [],
  lineItemsBeingRemoved: []
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

    case `${ADD_LINE_ITEMS}_PENDING`:
      return { ...state, addLineItemsStatus: PENDING };
    case `${ADD_LINE_ITEMS}_FULFILLED`:
      return { ...state, addLineItemsStatus: FULFILLED };

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
    case REMOVE_LINE_ITEMS:
      return {
        ...state,
        lineItemsBeingRemoved: state.lineItemsBeingUpdated.concat(
          action.payload
        )
      };
    case CANCEL_REMOVE_LINE_ITEMS:
      return {
        ...state,
        lineItemsBeingRemoved: state.lineItemsBeingRemoved.filter(
          item => item !== action.payload
        )
      };

    default:
      return state;
  }
};
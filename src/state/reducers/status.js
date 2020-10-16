import { FULFILLED, IDLE, PENDING, REJECTED } from 'constants/Status';
import { INITIALIZE_APPLICATION } from 'state/actions/applicationActions';
import {
  ADD_LINE_ITEMS,
  UPDATE_LINE_ITEMS,
  REMOVE_LINE_ITEMS,
  CANCEL_REMOVE_LINE_ITEMS,
  UPDATE_NOTE
} from 'state/actions/checkoutActions';

import {
  SIGN_IN_CUSTOMER,
  SIGN_UP_CUSTOMER
} from 'state/actions/customerActions';
import { SEND_CONTACT_FORM } from 'state/actions/ui/contactUIActions';
import { GET_AVAILABILITY } from 'state/actions/bookingsActions';
import { KLAVIYO_SIGNUP } from 'state/actions/klaviyoActions';

const initialState = {
  initializeApplication: IDLE,
  addLineItemsStatus: IDLE,
  lineItemsBeingUpdated: [],
  lineItemsBeingRemoved: [],
  customerSigningIn: IDLE,
  customerSigningUp: IDLE,
  updatingNote: IDLE,
  contactUsFormStatus: IDLE,
  getAvailability: IDLE,
  klaviyoSignup: IDLE
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

    case `${GET_AVAILABILITY}_PENDING`:
      return { ...state, getAvailability: PENDING };
    case `${GET_AVAILABILITY}_FULFILLED`:
      return { ...state, getAvailability: FULFILLED };
    case `${GET_AVAILABILITY}_REJECTED`:
      return { ...state, getAvailability: REJECTED };

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

    case `${SIGN_IN_CUSTOMER}_PENDING`:
      return { ...state, customerSigningIn: PENDING };
    case `${SIGN_IN_CUSTOMER}_FULFILLED`:
      return { ...state, customerSigningIn: FULFILLED };
    case `${SIGN_IN_CUSTOMER}_REJECTED`:
      return { ...state, customerSigningIn: REJECTED };

    case `${SIGN_UP_CUSTOMER}_PENDING`:
      return { ...state, customerSigningUp: PENDING };
    case `${SIGN_UP_CUSTOMER}_FULFILLED`:
      return {
        ...state,
        customerSigningUp: FULFILLED,
        customerSigningIn: IDLE
      };

    case `${UPDATE_NOTE}_PENDING`:
      return { ...state, updatingNote: PENDING };
    case `${UPDATE_NOTE}_FULFILLED`:
      return { ...state, updatingNote: FULFILLED };
    case `${UPDATE_NOTE}_REJECTED`:
      return { ...state, updatingNote: REJECTED };

    case `${SEND_CONTACT_FORM}_${PENDING}`:
      return {
        ...state,
        contactUsFormStatus: PENDING
      };
    case `${SEND_CONTACT_FORM}_${FULFILLED}`:
      return {
        ...state,
        contactUsFormStatus: FULFILLED
      };
    case `${SEND_CONTACT_FORM}_${REJECTED}`:
      return {
        ...state,
        contactUsFormStatus: REJECTED
      };

    case `${KLAVIYO_SIGNUP}_PENDING`:
      return { ...state, klaviyoSignup: PENDING };
    case `${KLAVIYO_SIGNUP}_FULFILLED`:
      return { ...state, klaviyoSignup: FULFILLED };
    case `${KLAVIYO_SIGNUP}_REJECTED`:
      return { ...state, klaviyoSignup: REJECTED };

    default:
      return state;
  }
};

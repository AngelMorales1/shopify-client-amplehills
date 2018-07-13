import {
  ACTIVATE_EDIT_CUSTOMER_FIELD,
  CANCEL_EDIT_CUSTOMER_FIELDS,
  ALERT_CUSTOMER_EDIT_SUCCESS
} from 'state/actions/ui/customerUIActions';
import {
  UPDATE_CUSTOMER,
  SIGN_OUT_CUSTOMER
} from 'state/actions/customerActions';

const initialState = {
  customerFieldBeingEdited: '',
  successfullyEditedFields: [],
  errors: ''
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ACTIVATE_EDIT_CUSTOMER_FIELD:
      return {
        ...state,
        customerFieldBeingEdited: action.payload
      };
    case ALERT_CUSTOMER_EDIT_SUCCESS:
      return {
        ...state,
        successfullyEditedFields: [action.payload]
      };
    case CANCEL_EDIT_CUSTOMER_FIELDS:
      return {
        ...state,
        customerFieldBeingEdited: initialState.customerFieldBeingEdited
      };
    case `${UPDATE_CUSTOMER}_REJECTED`:
      return {
        ...initialState,
        errors: action.payload
      };
    case `${UPDATE_CUSTOMER}_FULFILLED`:
      return {
        ...state,
        errors: initialState.error
      };
    case SIGN_OUT_CUSTOMER:
      return initialState;
    default:
      return state;
  }
};

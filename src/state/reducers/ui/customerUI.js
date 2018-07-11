import {
  EDIT_CUSTOMER_FIELD,
  CANCEL_EDIT_CUSTOMER_FIELDS
} from 'state/actions/ui/customerUIActions';

const initialState = {
  customerFieldsBeingEdited: []
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case EDIT_CUSTOMER_FIELD:
      return {
        ...state,
        customerFieldsBeingEdited: [action.payload]
      };
    case CANCEL_EDIT_CUSTOMER_FIELDS:
      return {
        ...state,
        customerFieldsBeingEdited: []
      };
    default:
      return state;
  }
};

export const ACTIVATE_EDIT_CUSTOMER_FIELD = 'ACTIVATE_EDIT_CUSTOMER_FIELD';
export const activateEditCustomerField = field => {
  return {
    type: ACTIVATE_EDIT_CUSTOMER_FIELD,
    field
  };
};

export const CANCEL_EDIT_CUSTOMER_FIELDS = 'CANCEL_EDIT_CUSTOMER_FIELDS';
export const cancelEditCustomerFields = () => {
  return {
    type: CANCEL_EDIT_CUSTOMER_FIELDS
  };
};

export const ALERT_CUSTOMER_EDIT_SUCCESS = 'ALERT_CUSTOMER_EDIT_SUCCESS';
export const alertCustomerEditSuccess = customer => {
  return {
    type: ALERT_CUSTOMER_EDIT_SUCCESS,
    payload: customer
  };
};

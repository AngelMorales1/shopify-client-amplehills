export const EDIT_CUSTOMER_FIELD = 'EDIT_CUSTOMER_FIELD';
export const editCustomerField = payload => {
  return {
    type: EDIT_CUSTOMER_FIELD,
    payload
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

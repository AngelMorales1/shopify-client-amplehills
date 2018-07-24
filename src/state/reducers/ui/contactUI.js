import { SEND_CONTACT_FORM } from 'state/actions/ui/contactUIActions';
import { IDLE, PENDING, FULFILLED, REJECTED } from 'constants/Status';

const initialState = {
  formStatus: IDLE
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${SEND_CONTACT_FORM}_${PENDING}`:
      return {
        ...state,
        formStatus: PENDING
      };
    case `${SEND_CONTACT_FORM}_${FULFILLED}`:
      return {
        ...state,
        formStatus: FULFILLED
      };
    case `${SEND_CONTACT_FORM}_${REJECTED}`:
      return {
        ...state,
        formStatus: REJECTED
      };
    default:
      return state;
  }
};

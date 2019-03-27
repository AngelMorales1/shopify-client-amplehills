import {
  OPEN_NEWSLETTER_MODAL,
  CLOSE_NEWSLETTER_MODAL
} from 'state/actions/ui/newsletterModalActions';

const initialState = {
  modalIsActive: false,
  renewModalDate: null
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_NEWSLETTER_MODAL:
      return {
        ...state,
        modalIsActive: true
      };
    case CLOSE_NEWSLETTER_MODAL:
      return {
        ...state,
        modalIsActive: false,
        renewModalDate: action.payload
      };
    default:
      return state;
  }
};

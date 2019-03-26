import {
  OPEN_NEWSLETTER_MODAL,
  CLOSE_NEWSLETTER_MODAL
} from 'state/actions/ui/newsletterModalActions';

const initialState = {
  newsletterModalIsActive: false
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case OPEN_NEWSLETTER_MODAL:
    case CLOSE_NEWSLETTER_MODAL:
      return {
        ...state,
        newsletterModalIsActive: action.payload
      };
    default:
      return state;
  }
};

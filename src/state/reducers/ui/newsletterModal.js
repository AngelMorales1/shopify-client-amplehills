import { HIDE_NEWSLETTER_MODAL } from 'state/actions/ui/newsletterModalActions';

const initialState = {
  hideNewsletterModalUntil: null
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case HIDE_NEWSLETTER_MODAL:
      return {
        ...state,
        hideNewsletterModalUntil: action.payload
      };
    default:
      return state;
  }
};

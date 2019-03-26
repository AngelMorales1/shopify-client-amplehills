export const HIDE_NEWSLETTER_MODAL = 'HIDE_NEWSLETTER_MODAL';
export const hideNewsletterModal = payload => {
  return {
    type: HIDE_NEWSLETTER_MODAL,
    payload
  };
};

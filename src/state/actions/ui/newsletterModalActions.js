export const OPEN_NEWSLETTER_MODAL = 'OPEN_NEWSLETTER_MODAL';
export const openNewsletterModal = () => {
  return {
    type: OPEN_NEWSLETTER_MODAL,
    payload: true
  };
};

export const CLOSE_NEWSLETTER_MODAL = 'CLOSE_NEWSLETTER_MODAL';
export const closeNewsletterModal = () => {
  return {
    type: CLOSE_NEWSLETTER_MODAL,
    payload: false
  };
};

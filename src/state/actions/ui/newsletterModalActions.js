export const OPEN_NEWSLETTER_MODAL = 'OPEN_NEWSLETTER_MODAL';
export const openNewsletterModal = () => ({
  type: OPEN_NEWSLETTER_MODAL
});

export const CLOSE_NEWSLETTER_MODAL = 'CLOSE_NEWSLETTER_MODAL';
export const closeNewsletterModal = renewModalDate => ({
  type: CLOSE_NEWSLETTER_MODAL,
  payload: renewModalDate
});

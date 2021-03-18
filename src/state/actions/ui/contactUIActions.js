import Firestore from 'lib/Firestore';

export const SEND_CONTACT_FORM = 'SEND_CONTACT_FORM';
export const sendContactForm = ticket => dispatch => {
  return dispatch({
    type: SEND_CONTACT_FORM,
    payload: Firestore.HappyFox.createTicket(ticket)
  });
};

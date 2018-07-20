export const SEND_CONTACT_FORM = 'SEND_CONTACT_FORM';
export const sendContactForm = payload => dispatch => {
  return dispatch({
    type: SEND_CONTACT_FORM,
    payload: new Promise((resolve, reject) => {
      setTimeout(3000, resolve('sent'));
    })
  });
};

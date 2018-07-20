export const SEND_CONTACT_FORM = 'SEND_CONTACT_FORM';
export const sendContactForm = payload => dispatch => {
  return dispatch({
    type: SEND_CONTACT_FORM,
    payload: new Promise((resolve, reject) => {
      return setTimeout(() => {
        reject('sent');
      }, 1500);
    })
  });
};

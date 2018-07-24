export const SEND_CONTACT_FORM = 'SEND_CONTACT_FORM';
export const sendContactForm = contactInfo => dispatch => {
  const { selectedAddress, name, email, phone, message } = contactInfo;
  return dispatch({
    type: SEND_CONTACT_FORM,
    payload: fetch(selectedAddress, {
      method: 'post',
      mode: 'cors',
      headers: {
        accept: 'application/javascript',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, message })
    })
  });
};

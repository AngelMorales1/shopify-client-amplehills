export const SIGN_IN_USER = 'SIGN_IN_USER';
export const signInUser = payload => dispatch => {
  return dispatch({
    type: SIGN_IN_USER,
    payload: new Promise(resolve => setTimeout(resolve(), 2000))
  });
};

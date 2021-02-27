import Klaviyo from 'lib/Klaviyo';

export const KLAVIYO_SIGNUP = 'KLAVIYO_SIGNUP';
export const klaviyoSignup = email => ({
  type: KLAVIYO_SIGNUP,
  payload: Klaviyo.signup(email)
});

export const KLAVIYO_LIST_SIGNUP = 'KLAVIYO_LIST_SIGNUP';
export const klaviyoListSignup = (email, list) => ({
  type: KLAVIYO_LIST_SIGNUP,
  payload: Klaviyo.signupV1(email, list)
});

import Klaviyo from 'lib/Klaviyo';

export const KLAVIYO_SIGNUP = 'KLAVIYO_SIGNUP';
export const klaviyoSignup = email => ({
  type: KLAVIYO_SIGNUP,
  payload: Klaviyo.signup(email)
});

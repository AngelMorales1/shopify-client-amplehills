import Data from 'lib/Data';

export const GET_GLOBAL_SETTINGS = 'GET_GLOBAL_SETTINGS';
export const getGlobalSettings = payload => dispatch => {
  return dispatch({
    type: GET_GLOBAL_SETTINGS,
    payload: Data.getEntries({
      content_type: 'globalSettings'
    })
  });
};

export const GET_PRIVACY_POLICY = 'GET_PRIVACY_POLICY';
export const getPrivacyPolicy = payload => dispatch => {
  return dispatch({
    type: GET_PRIVACY_POLICY,
    payload: Data.getEntries({
      content_type: 'privacyPolicy'
    })
  });
};

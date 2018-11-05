import Data from 'lib/Data';

export const GET_GLOBAL_SETTINGS = 'GET_GLOBAL_SETTINGS';
export const getGlobalSettings = payload => dispatch => {
  return dispatch({
    type: GET_GLOBAL_SETTINGS,
    payload: Data.getEntries({
      content_type: 'globalSettings',
      include: 4
    })
  });
};

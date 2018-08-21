import Data from 'lib/Data';

export const GET_PRESS_DATA = 'GET_PRESS_DATA';
export const getPressData = payload => dispatch => {
  return dispatch({
    type: GET_PRESS_DATA,
    payload: Data.getEntries({
      content_type: 'pressCard'
    })
  });
};

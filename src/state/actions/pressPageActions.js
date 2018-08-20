import Data from 'lib/Data';

export const GET_PRESS_PAGE = 'GET_PRESS_PAGE';
export const getPressPage = payload => dispatch => {
  return dispatch({
    type: GET_PRESS_PAGE,
    payload: Data.getEntries({
      content_type: 'pressPage'
    })
  });
};

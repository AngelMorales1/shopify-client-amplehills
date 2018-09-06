import Data from 'lib/Data';

export const GET_EVENT_PAGE = 'GET_EVENT_PAGE';
export const getEventPage = payload => dispatch => {
  return dispatch({
    type: GET_EVENT_PAGE,
    payload: Data.getEntries({
      content_type: 'eventPage'
    })
  });
};

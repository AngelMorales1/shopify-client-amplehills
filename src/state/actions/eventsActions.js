import Data from 'lib/Data';

export const GET_EVENTS = 'GET_EVENTS';
export const getEvents = payload => dispatch => {
  return dispatch({
    type: GET_EVENTS,
    payload: Data.getEntries({
      content_type: 'event'
    })
  });
};

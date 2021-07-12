import Sanity from 'lib/Sanity';

export const GET_EVENTS = 'GET_EVENTS';
export const getEvents = payload => dispatch => {
  return dispatch({
    type: GET_EVENTS,
    payload: Sanity.fetchEvents()
  });
};

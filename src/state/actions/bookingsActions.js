import Bookings from 'lib/Bookings';

export const GET_AVAILABILITY = 'GET_AVAILABILITY';

export const getAvailability = projectId => dispatch => {
  return dispatch({
    type: GET_AVAILABILITY,
    payload: Bookings.getAvailability(projectId),
    meta: { projectId }
  });
};

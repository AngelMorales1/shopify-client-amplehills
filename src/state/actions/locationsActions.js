import Data from 'lib/Data';

export const GET_LOCATION_DATA = 'GET_LOCATION_DATA';
export const getLocationData = payload => dispatch => {
  return dispatch({
    type: GET_LOCATION_DATA,
    payload: Data.getEntries({
      content_type: 'locations'
    })
  });
};

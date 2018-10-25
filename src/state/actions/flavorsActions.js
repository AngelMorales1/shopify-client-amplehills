import Data from 'lib/Data';

export const GET_FLAVORS = 'GET_FLAVORS';
export const getFlavors = payload => dispatch => {
  return dispatch({
    type: GET_FLAVORS,
    payload: Data.getEntries({
      content_type: 'flavors'
    })
  });
};

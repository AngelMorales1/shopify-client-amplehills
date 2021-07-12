import Data from 'lib/Data';
import Sanity from 'lib/Sanity';

export const GET_FLAVORS = 'GET_FLAVORS';
export const getFlavors = payload => dispatch => {
  return dispatch({
    type: GET_FLAVORS,
    payload: Sanity.fetchFlavors()
  });
};

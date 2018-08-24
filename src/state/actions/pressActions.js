import Data from 'lib/Data';

export const GET_PRESS_ITEMS = 'GET_PRESS_ITEMS';
export const getPressItems = payload => dispatch => {
  return dispatch({
    type: GET_PRESS_ITEMS,
    payload: Data.getEntries({
      content_type: 'pressItem'
    })
  });
};

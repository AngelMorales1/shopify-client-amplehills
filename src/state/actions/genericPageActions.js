import Data from 'lib/Data';

export const GET_GENERIC_PAGE = 'GET_GENERIC_PAGE';
export const getGenericPage = title => dispatch => {
  return dispatch({
    type: GET_GENERIC_PAGE,
    payload: Data.getEntries({
      content_type: 'genericPage',
      'fields.title': title
    })
  });
};

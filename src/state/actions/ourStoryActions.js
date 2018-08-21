import Data from 'lib/Data';

export const GET_OUR_STORY_PAGE = 'GET_OUR_STORY_PAGE';
export const getOurStoryPage = payload => dispatch => {
  return dispatch({
    type: GET_OUR_STORY_PAGE,
    payload: Data.getEntries({
      content_type: 'ourStoryPage'
    })
  });
};

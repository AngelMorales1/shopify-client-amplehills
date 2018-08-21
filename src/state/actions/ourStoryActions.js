import Data from 'lib/Data';

export const GET_OUR_STORY_DATA = 'GET_OUR_STORY_DATA';
export const getOurStoryData = payload => dispatch => {
  return dispatch({
    type: GET_OUR_STORY_DATA,
    payload: Data.getEntries({
      content_type: 'ourStoryPage'
    })
  });
};

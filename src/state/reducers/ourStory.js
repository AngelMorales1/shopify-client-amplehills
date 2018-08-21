import { GET_OUR_STORY_PAGE } from 'state/actions/ourStoryPageActions';

const initialState = {
  ourStory: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_OUR_STORY_PAGE}_FULFILLED`:
      return {
        ...state,
        ourStory: action.payload
      };
    default:
      return state;
  }
};

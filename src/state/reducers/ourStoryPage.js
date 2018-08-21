import { GET_OUR_STORY_DATA } from 'state/actions/ourStoryPageActions';

const initialState = {
  ourStoragePage: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_OUR_STORY_DATA}_FULFILLED`:
      return {
        ...state,
        ourStoragePage: action.payload
      };
    default:
      return state;
  }
};

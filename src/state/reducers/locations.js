<<<<<<< HEAD:src/state/reducers/locations.js
import { GET_LOCATION_DATA } from 'state/actions/locationsActions';
=======
import { GET_OUR_STORY_PAGE } from 'state/actions/ourStoryPageActions';
>>>>>>> clean up:src/state/reducers/ourStory.js

const initialState = {
  locations: []
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${GET_LOCATION_DATA}_FULFILLED`:
      return {
        ...state,
        locations: action.payload
      };
    default:
      return state;
  }
};

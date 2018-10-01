import {
  FETCH_NEWS,
  FETCH_NEWS_TAGS,
  FETCH_NEWS_BY_TAG
} from 'state/actions/newsActions';

const initialState = {
  news: {},
  newsTags: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_NEWS}_FULFILLED`:
      return {
        ...state,
        news: action.payload
      };
    case `${FETCH_NEWS_TAGS}_FULFILLED`:
      return {
        ...state,
        newsTags: action.payload
      };
    case `${FETCH_NEWS_BY_TAG}_FULFILLED`:
      return {
        ...state,
        news: action.payload
      };
    default:
      return state;
  }
};

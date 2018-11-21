import {
  FETCH_ALL_NEWS_ARTICLES,
  ADD_SELECTED_TAG,
  REMOVE_SELECTED_TAG,
  GET_ARTICLES_BY_TAGS
} from 'state/actions/articlesActions';

const initialState = {
  newsArticles: [],
  selectedTags: [],
  articlesByTags: []
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_ALL_NEWS_ARTICLES}_FULFILLED`:
      return {
        ...state,
        newsArticles: action.payload
      };
    case `${ADD_SELECTED_TAG}_FULFILLED`:
      return {
        ...state,
        selectedTags: action.payload
      };
    case `${REMOVE_SELECTED_TAG}_FULFILLED`:
      return {
        ...state,
        selectedTags: action.payload
      };
    case `${GET_ARTICLES_BY_TAGS}_FULFILLED`:
      return {
        ...state,
        articlesByTags: action.payload
      };
    default:
      return state;
  }
};

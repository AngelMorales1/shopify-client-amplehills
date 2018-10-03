import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_TAGS,
  FETCH_ARTICLES_BY_TAG
} from 'state/actions/articlesActions';

const initialState = {
  articles: {},
  articlesTags: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_ARTICLES}_FULFILLED`:
      return {
        ...state,
        articles: action.payload
      };
    case `${FETCH_ARTICLES_TAGS}_FULFILLED`:
      return {
        ...state,
        articlesTags: action.payload
      };
    case `${FETCH_ARTICLES_BY_TAG}_FULFILLED`:
      return {
        ...state,
        articles: action.payload
      };
    default:
      return state;
  }
};

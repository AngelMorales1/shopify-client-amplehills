import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_TAGS,
  FETCH_ALL_PAGE_CURSORS
} from 'state/actions/articlesActions';

const initialState = {
  articles: {},
  articlesTags: {},
  cursors: []
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
    case `${FETCH_ALL_PAGE_CURSORS}_FULFILLED`:
      return {
        ...state,
        cursors: action.payload
      };
    default:
      return state;
  }
};

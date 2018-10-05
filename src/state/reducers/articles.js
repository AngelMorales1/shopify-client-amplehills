import { FETCH_ALL_NEWS_ARTICLES } from 'state/actions/articlesActions';

const initialState = {
  newsArticles: {}
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case `${FETCH_ALL_NEWS_ARTICLES}_FULFILLED`:
      return {
        ...state,
        newsArticles: action.payload
      };
    default:
      return state;
  }
};

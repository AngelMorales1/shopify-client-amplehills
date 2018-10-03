import { client as Apollo } from 'lib/Apollo';

import { fetchNews, fetchNewsTag, fetchNewsByTag } from 'state/graphql/news';

export const FETCH_NEWS = 'FETCH_NEWS';
export const fetchArticles = payload => dispatch => {
  return dispatch({
    type: FETCH_NEWS,
    payload: Apollo.query({
      query: fetchNews
    })
  });
};

export const FETCH_NEWS_TAGS = 'FETCH_NEWS_TAGS';
export const fetchArticlesTags = payload => dispatch => {
  return dispatch({
    type: FETCH_NEWS_TAGS,
    payload: Apollo.query({
      query: fetchNewsTag
    })
  });
};

export const FETCH_NEWS_BY_TAG = 'FETCH_NEWS_BY_TAG';
export const fetchArticlesByTag = tag => dispatch => {
  return dispatch({
    type: FETCH_NEWS_BY_TAG,
    payload: Apollo.query({
      query: fetchNewsByTag,
      variables: { tag }
    })
  });
};

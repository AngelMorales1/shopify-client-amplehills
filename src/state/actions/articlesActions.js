import { client as Apollo } from 'lib/Apollo';

import {
  fetchArticlesQuery,
  fetchArticlesTagsQuery,
  fetchArticlesByTagQuery,
  cursorFetch
} from 'state/graphql/articles';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const fetchArticles = payload => dispatch => {
  return dispatch({
    type: FETCH_ARTICLES,
    payload: Apollo.query({
      query: fetchArticlesQuery
    })
  });
};

export const FETCH_ARTICLES_TAGS = 'FETCH_ARTICLES_TAGS';
export const fetchArticlesTags = payload => dispatch => {
  return dispatch({
    type: FETCH_ARTICLES_TAGS,
    payload: Apollo.query({
      query: fetchArticlesTagsQuery
    })
  });
};

export const FETCH_ARTICLES_BY_TAG = 'FETCH_ARTICLES_BY_TAG';
export const fetchArticlesByTag = tag => dispatch => {
  return dispatch({
    type: FETCH_ARTICLES_BY_TAG,
    payload: Apollo.query({
      query: fetchArticlesByTagQuery,
      variables: { tag }
    })
  });
};

export const FETCH_CURSOR = 'FETCH_CURSOR';
export const fetchCursor = cursor => dispatch => {
  return dispatch({
    type: FETCH_CURSOR,
    payload: Apollo.query({
      query: cursorFetch,
      variables: { cursor }
    })
  });
};

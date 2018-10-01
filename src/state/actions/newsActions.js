import { client as Apollo } from 'lib/Apollo';
import get from 'utils/get';

import { newsFetch, newsTagFetch, newsByTagFetch } from 'state/graphql/news';

export const FETCH_NEWS = 'FETCH_NEWS';
export const fetchNews = payload => dispatch => {
  return dispatch({
    type: FETCH_NEWS,
    payload: Apollo.query({
      query: newsFetch
    })
  });
};

export const FETCH_NEWS_TAGS = 'FETCH_NEWS_TAGS';
export const fetchNewsTags = payload => dispatch => {
  return dispatch({
    type: FETCH_NEWS_TAGS,
    payload: Apollo.query({
      query: newsTagFetch
    })
  });
};

export const FETCH_NEWS_BY_TAG = 'FETCH_NEWS_BY_TAG';
export const newsFetchByTag = tag => dispatch => {
  return dispatch({
    type: FETCH_NEWS_BY_TAG,
    payload: Apollo.query({
      query: newsByTagFetch,
      variables: { tag }
    })
  });
};

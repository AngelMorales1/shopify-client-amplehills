import { client as Apollo } from 'lib/Apollo';

import { newsFetch, cursorFetch } from 'state/graphql/news';

export const FETCH_NEWS = 'FETCH_NEWS';
export const fetchNews = cursor => dispatch => {
  return dispatch({
    type: FETCH_NEWS,
    payload: Apollo.query({
      query: newsFetch,
      variables: { cursor }
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

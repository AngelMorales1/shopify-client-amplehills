import Data from 'lib/Data';
import { client as Apollo } from 'lib/Apollo';

import { newsFetch } from 'state/graphql/news';

export const FETCH_NEWS = 'FETCH_NEWS';
export const fetchNews = payload => dispatch => {
  return dispatch({
    type: FETCH_NEWS,
    payload: Apollo.query({
      query: newsFetch
    })
  });
};

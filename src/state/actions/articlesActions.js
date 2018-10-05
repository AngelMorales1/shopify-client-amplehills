import { client as Apollo } from 'lib/Apollo';
import get from 'utils/get';

import { fetchAllNewsArticlesQuery } from 'state/graphql/articles';

export const FETCH_ALL_NEWS_ARTICLES = 'FETCH_ALL_NEWS_ARTICLES';
export const fetchAllNewsArticles = payload => dispatch => {
  return dispatch({
    type: FETCH_ALL_NEWS_ARTICLES,
    payload: getAllArticles(null, true)
  });
};

const getAllArticles = async (
  lastItemCursor,
  hasNextPage,
  collectedArticles = []
) => {
  if (hasNextPage) {
    const res = await Apollo.query({
      query: fetchAllNewsArticlesQuery,
      variables: { cursor: lastItemCursor }
    });
    const articles = get(res, 'data.blogs.edges[0].node.articles', {});
    const nextPage = get(articles, 'pageInfo.hasNextPage', false);
    const edges = get(articles, 'edges', []);
    const lastCursor = get(edges[edges.length - 1], 'cursor', null);
    const addedCollectedArticles = collectedArticles.concat(edges);

    return getAllArticles(lastCursor, nextPage, addedCollectedArticles);
  } else {
    return collectedArticles;
  }
};

import { client as Apollo } from 'lib/Apollo';
import get from 'utils/get';

import {
  fetchAllNewsArticlesQuery,
  fetchArticlesQuery,
  fetchArticlesTagsQuery,
  fetchCursorQuery
} from 'state/graphql/articles';

let allArticleFetched = false;
let fetchedTag = '';

export const FETCH_ALL_NEWS_ARTICLES = 'FETCH_ALL_NEWS_ARTICLES';
export const fetchAllNewsArticles = payload => dispatch => {
  return dispatch({
    type: FETCH_ALL_NEWS_ARTICLES,
    payload: Apollo.query({
      query: fetchAllNewsArticlesQuery
    })
  });
};

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const fetchArticles = (cursor, tag) => dispatch => {
  return dispatch({
    type: FETCH_ARTICLES,
    payload: Apollo.query({
      query: fetchArticlesQuery,
      variables: { cursor, tag }
    }).then(res => {
      if ((!allArticleFetched && !tag) || (tag && tag !== fetchedTag)) {
        const articlesData = get(res, 'data.articles', {});

        dispatch(
          fetchAllPageCursors(get(articlesData, 'edges[4].cursor', ''), true)
        );
      }

      if (tag) {
        fetchedTag = tag;
        allArticleFetched = false;
      } else {
        fetchedTag = '';
        allArticleFetched = true;
      }

      return res;
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

export const FETCH_ALL_PAGE_CURSORS = 'FETCH_ALL_PAGE_CURSORS';
export const fetchAllPageCursors = (
  lastItemCursor,
  hasNextPage
) => dispatch => {
  return dispatch({
    type: FETCH_ALL_PAGE_CURSORS,
    payload: getAllCursors(lastItemCursor, hasNextPage)
  });
};

const getAllCursors = async (
  lastItemCursor,
  hasNextPage,
  collectedCursors = []
) => {
  if (hasNextPage && lastItemCursor) {
    const res = await Apollo.query({
      query: fetchCursorQuery,
      variables: { cursor: lastItemCursor }
    });

    const articles = get(res, 'data.articles', {});
    const lastCursor = get(articles, 'edges[4].cursor', '');
    const nextPage = get(articles, 'pageInfo.hasNextPage', false);

    const addedCursorCollected = collectedCursors.concat([lastCursor]);

    return getAllCursors(lastCursor, nextPage, addedCursorCollected);
  } else {
    return collectedCursors;
  }
};

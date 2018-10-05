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

export const ADD_SELECTED_TAG = 'ADD_SELECTED_TAG';
export const addSelectedTag = tag => (dispatch, getState) => {
  const selectedTags = getState().articles.selectedTags;
  selectedTags.push(tag);

  dispatch(getArticlesByTags(selectedTags));

  return dispatch({
    type: ADD_SELECTED_TAG,
    payload: selectedTags
  });
};

export const REMOVE_SELECTED_TAG = 'REMOVE_SELECTED_TAG';
export const removeSelectedTag = tag => (dispatch, getState) => {
  const selectedTags = getState().articles.selectedTags;
  const index = selectedTags.indexOf(tag);
  if (index !== -1) selectedTags.splice(index, 1);

  dispatch(getArticlesByTags(selectedTags));

  return dispatch({
    type: REMOVE_SELECTED_TAG,
    payload: selectedTags
  });
};

export const GET_ARTICLES_BY_TAGS = 'GET_ARTICLES_BY_TAGS';
export const getArticlesByTags = tags => (dispatch, getState) => {
  const filteredArticles = tags.length
    ? getState().articles.newsArticles.filter(article => {
        const articlesTags = article.node.tags;
        if (articlesTags.length) {
          for (let i = 0; i < articlesTags.length; i++) {
            if (tags.indexOf(articlesTags[i]) > -1) {
              return true;
            }
          }
        }

        return false;
      })
    : [];

  return dispatch({
    type: GET_ARTICLES_BY_TAGS,
    payload: new Promise((resolve, reject) => resolve(filteredArticles))
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

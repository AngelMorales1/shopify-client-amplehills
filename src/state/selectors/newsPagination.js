import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'news.pagination.data.articles.edges', []),
  paginations => {
    const pageCount = paginations.length;

    let pageLastItemCursors = [];
    for (let i = 4; i <= pageCount; i += 5) {
      pageLastItemCursors.push(get(paginations[i], 'cursor', ''));
    }

    const lastItem = get(paginations[paginations.length - 1], 'cursor', '');
    if (lastItem !== pageLastItemCursors[pageLastItemCursors.length - 1]) {
      pageLastItemCursors.push(lastItem);
    }

    return pageLastItemCursors;
  }
);

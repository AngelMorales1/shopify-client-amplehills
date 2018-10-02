import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'news.cursors'),
  cursors => {
    return cursors.map(cursor =>
      get(cursor, 'data.articles.edges[4].cursor', '')
    );
  }
);

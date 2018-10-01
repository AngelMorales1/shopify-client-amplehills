import { createSelector } from 'reselect';
import get from 'utils/get';
import moment from 'moment';

export default createSelector(
  state =>
    get(state, 'news.newsTags.data.blogs.edges[0].node.articles.edges', []),
  newsTags => {
    return newsTags.reduce((sortedTags, currentTags) => {
      const tags = get(currentTags, 'node.tags', []);

      tags.forEach(tag => {
        sortedTags[tag] = true;
      });

      return sortedTags;
    }, {});
  }
);

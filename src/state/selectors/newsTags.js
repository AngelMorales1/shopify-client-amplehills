import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'news.newsTags.data.articles.edges', []),
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

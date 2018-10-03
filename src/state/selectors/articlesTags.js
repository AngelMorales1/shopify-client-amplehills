import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'articles.articlesTags.data.articles.edges', []),
  articlesTags => {
    return articlesTags.reduce((sortedTags, currentTags) => {
      const tags = get(currentTags, 'node.tags', []);

      tags.forEach(tag => {
        sortedTags[tag] = true;
      });

      return sortedTags;
    }, {});
  }
);

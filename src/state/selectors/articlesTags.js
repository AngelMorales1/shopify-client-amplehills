import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  articles => articles,
  articles => {
    return articles.reduce((tags, article) => {
      const currentArticleTags = get(article, 'node.tags', []);
      currentArticleTags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });

      return tags;
    }, []);
  }
);

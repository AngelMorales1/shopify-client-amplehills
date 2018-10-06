import { createSelector } from 'reselect';
import get from 'utils/get';
import articles from 'state/selectors/articles';

export default createSelector(
  blogArticles => articles(blogArticles),
  articles => {
    return articles.reduce((articlesByhandle, article) => {
      const handle = article.handle;
      articlesByhandle[handle] = article;

      return articlesByhandle;
    }, {});
  }
);

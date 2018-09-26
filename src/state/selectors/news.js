import { createSelector } from 'reselect';
import get from 'utils/get';
import moment from 'moment';

export default createSelector(
  state => get(state, 'news.news.data.shop.blogs.edges[0].node.articles'),
  news => {
    const pageInfo = get(news, 'pageInfo', {});
    const hasNextPage = get(pageInfo, 'hasNextPage', false);
    const hasPreviousPage = get(pageInfo, 'hasPreviousPage', false);
    const articles = get(news, 'edges', []).reduce(
      (sortedArticles, article) => {
        const cursor = get(article, 'cursor', '');
        const node = get(article, 'node', {});
        const author = get(node, 'author', {});
        const authorName = get(author, 'name', '');
        const authorEmail = get(author, 'email', '');
        const content = get(node, 'contentHtml', '');
        const image = get(node, 'image.originalSrc', '');
        const publishedAt = moment(get(node, 'publishedAt', '')).format(
          'MMMM D YYYY'
        );
        const title = get(node, 'title', '');
        const tags = get(node, 'tags', []).reduce((sortedTags, tag) => {
          sortedTags[tag] = tag;
          return sortedTags;
        }, {});

        const sortedArticle = {
          cursor,
          authorName,
          authorEmail,
          content,
          image,
          publishedAt,
          title,
          tags
        };
        return sortedArticles.concat([sortedArticle]);
      },
      []
    );

    return {
      hasNextPage,
      hasPreviousPage,
      articles
    };
  }
);

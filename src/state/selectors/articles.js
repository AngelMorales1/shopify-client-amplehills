import { createSelector } from 'reselect';
import get from 'utils/get';
import moment from 'moment';

export default createSelector(
  articles => articles,
  articles => {
    return articles.map((article, i) => {
      const cursor = get(article, 'cursor', '');
      const node = get(article, 'node', {});
      const author = get(node, 'author', {});
      const authorName = get(author, 'name', '');
      const authorEmail = get(author, 'email', '');
      const contentHtml = get(node, 'contentHtml', '');
      const content = get(node, 'content', '');
      const image = get(node, 'image.originalSrc', '');
      const handle = get(node, 'handle', '');
      const publishedAt = moment(get(node, 'publishedAt', '')).format(
        'MMMM D YYYY'
      );
      const title = get(node, 'title', '');
      const id = get(node, 'id', '');
      const tags = get(node, 'tags', []).reduce((tagsObject, tag) => {
        tagsObject[tag] = true;
        return tagsObject;
      }, {});
      const index = i;

      return {
        cursor,
        authorName,
        authorEmail,
        contentHtml,
        content,
        image,
        handle,
        publishedAt,
        title,
        id,
        tags,
        index
      };
    });
  }
);

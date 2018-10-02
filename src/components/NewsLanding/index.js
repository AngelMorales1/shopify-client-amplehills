import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import { FacebookShareButton } from 'react-share';
import articleModel from 'models/articleModel';

import styles from './NewsLanding.scss';
import ArticlePreview from 'components/ArticlePreview';
import RecentArticle from 'components/RecentArticle';
import { Image, Button } from 'components/base';

class NewsLAnding extends Component {
  handlePaginationClick = (cursor, pageNumber) => {
    const fetchNews = get(this, 'props.actions.fetchNews', () => {});

    if (pageNumber === 1) {
      return fetchNews();
    }

    return fetchNews(cursor);
  };

  render() {
    const { news, actions, cursors } = this.props;
    const articles = get(news, 'articles', []);
    const test = get(articles[4], 'cursor', '');
    return (
      <div
        className={cx(styles['NewsLanding'], 'flex justify-between py4 px2')}
      >
        <div className="col-12 md-col-3 px2">
          <h2 className="callout mb2">Recent Articles</h2>
          <div className="flex flex-column mb3">
            {articles
              .slice(0, 4)
              .map(article => (
                <RecentArticle key={article.id} article={article} />
              ))}
          </div>
        </div>
        <div
          className={cx(
            styles['NewsLanding__article-preview-container'],
            'col-12 md-col-6'
          )}
        >
          {articles.map(article => (
            <ArticlePreview key={article.id} article={article} />
          ))}
          <div className="flex flex-row">
            <Image
              className="icon"
              src="/assets/images/icon-pagination-previous-arrow.svg"
            />
            {cursors.map((lastItemCursor, i) => (
              <Button
                onClick={() =>
                  this.handlePaginationClick(cursors[i - 1], i + 1)
                }
                variant="style-none"
                label={i + 1}
              />
            ))}
            <Image
              className="icon"
              src="/assets/images/icon-pagination-next-arrow.svg"
            />
          </div>
        </div>
      </div>
    );
  }
}

NewsLAnding.propTypes = {
  hasNextPage: PropTypes.bool,
  hasPreviousPage: PropTypes.bool,
  articles: PropTypes.arrayOf(articleModel.propTypes)
};

NewsLAnding.defaultProps = {
  hasNextPage: false,
  hasPreviousPage: false,
  articles: []
};

export default NewsLAnding;

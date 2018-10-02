import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import { FacebookShareButton } from 'react-share';
import articleModel from 'models/articleModel';

import styles from './NewsLanding.scss';
import ArticlePreview from 'components/ArticlePreview';
import RecentArticle from 'components/RecentArticle';

const NewsLanding = ({ news }) => {
  const articles = get(news, 'articles', []);

  return (
    <div className={cx(styles['NewsLanding'], 'flex justify-between py4 px2')}>
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
      </div>
    </div>
  );
};

NewsLanding.propTypes = {
  hasNextPage: PropTypes.bool,
  hasPreviousPage: PropTypes.bool,
  articles: PropTypes.arrayOf(articleModel.propTypes)
};

NewsLanding.defaultProps = {
  hasNextPage: false,
  hasPreviousPage: false,
  articles: []
};

export default NewsLanding;

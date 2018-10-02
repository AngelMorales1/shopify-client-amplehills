import React, { Component } from 'react';
import get from 'utils/get';
import cx from 'classnames';

import styles from './NewsLandingView.scss';
import ArticlePreview from 'components/ArticlePreview';
import RecentArticle from 'components/RecentArticle';

class NewsLandingView extends Component {
  render() {
    const articles = get(this, 'props.news.articles', []);

    return (
      <div
        className={cx(
          styles['NewsLandingView'],
          'flex justify-between py4 px2'
        )}
      >
        <div className="col-12 md-col-3 px2">
          <h2 className="callout mb2">Recent Articles</h2>
          <div className="flex flex-column mb3">
            {articles
              .slice(0, 4)
              .map((article, i) => (
                <RecentArticle key={article.id} article={article} />
              ))}
          </div>
        </div>
        <div
          className={cx(
            styles['NewsLandingView__article-preview-container'],
            'col-12 md-col-6'
          )}
        >
          {articles.map((article, i) => (
            <ArticlePreview key={article.id} article={article} />
          ))}
        </div>
      </div>
    );
  }
}

export default NewsLandingView;

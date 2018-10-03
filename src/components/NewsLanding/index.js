import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import articleModel from 'models/articleModel';
import { Button } from 'components/base';

import styles from './NewsLanding.scss';
import ArticlePreview from 'components/ArticlePreview';
import RecentArticle from 'components/RecentArticle';

class NewsLanding extends Component {
  state = {
    selectedTagButton: ''
  };

  handleTagButtonClick = tag => {
    const fetchArticlesByTag = get(
      this,
      'props.actions.fetchArticlesByTag',
      () => {}
    );

    if (tag === this.state.selectedTagButton) {
      fetchArticlesByTag();
      return this.setState({ selectedTagButton: '' });
    }
    fetchArticlesByTag(tag);
    this.setState({ selectedTagButton: tag });
  };

  render() {
    const { news, tags } = this.props;
    const articles = get(news, 'articles', []);

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
        </div>
        <div
          className={cx(
            styles['NewsLanding__line'],
            'mb3 px2 mx2 md-hide lg-hide'
          )}
        />
        <div className="col-12 md-col-3 px2">
          <h2 className="callout mb2">Tags</h2>
          {tags.map(tag => {
            const buttonIsSelected = tag === this.state.selectedTagButton;

            return (
              <Button
                onClick={() => this.handleTagButtonClick(tag)}
                key={tag}
                className="uppercase mb1 mr1"
                label={tag}
                color="green"
                variant={cx({
                  tag: !buttonIsSelected,
                  'selected-tag': buttonIsSelected
                })}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

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

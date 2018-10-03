import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import articleModel from 'models/articleModel';
import { Button } from 'components/base';

import styles from './ArticlesLanding.scss';
import ArticlePreview from 'components/ArticlePreview';
import RecentArticle from 'components/RecentArticle';

class ArticlesLanding extends Component {
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
    const { articles, tags } = this.props;
    const getArticles = get(articles, 'articles', []);

    return (
      <div
        className={cx(
          styles['ArticlesLanding'],
          'flex justify-between py4 px2'
        )}
      >
        <div className="col-12 md-col-3 px2">
          <h2 className="callout mb2">Recent Articles</h2>
          <div className="flex flex-column mb3">
            {getArticles
              .slice(0, 4)
              .map(article => (
                <RecentArticle key={article.id} article={article} />
              ))}
          </div>
        </div>
        <div
          className={cx(
            styles['ArticlesLanding__article-preview-container'],
            'col-12 md-col-6'
          )}
        >
          {getArticles.map(article => (
            <ArticlePreview key={article.id} article={article} />
          ))}
        </div>
        <div
          className={cx(
            styles['ArticlesLanding__line'],
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

ArticlesLanding.propTypes = {
  articles: PropTypes.shape({
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    articles: PropTypes.arrayOf(articleModel.propTypes)
  })
};

ArticlesLanding.defaultProps = {
  articles: {
    hasNextPage: false,
    hasPreviousPage: false,
    articles: []
  }
};

export default ArticlesLanding;

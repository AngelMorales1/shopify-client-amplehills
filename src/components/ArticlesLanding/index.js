import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import getPagination from 'utils/getPagination';
import cx from 'classnames';
import articleModel from 'models/articleModel';
import { Image, Button } from 'components/base';
import Global from 'constants/Global';

import styles from './ArticlesLanding.scss';
import ArticlePreview from 'components/ArticlePreview';
import RecentArticle from 'components/RecentArticle';

class ArticlesLanding extends Component {
  state = {
    selectedPage: 1,
    currentBreakpoint: Global.breakpoints.small.label
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);

    this.updateWindow();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  updateWindow = () => {
    const { small, large } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= large.lowerbound ? small.label : large.label;

    if (this.state.currentBreakpoint !== currentBreakpoint) {
      this.setState({ currentBreakpoint });
    }
  };

  handleTagButtonClick = tag => {
    const { removeSelectedTag, addSelectedTag } = get(
      this,
      'props.actions',
      {}
    );
    this.setState({ selectedPage: 1 });

    if (this.props.selectedTags.indexOf(tag) > -1) {
      return removeSelectedTag(tag);
    }

    return addSelectedTag(tag);
  };

  render() {
    const articlesByTags = get(this, 'props.articlesByTags', []);
    const articles = articlesByTags.length
      ? articlesByTags
      : get(this, 'props.articles', []);
    const tags = get(this, 'props.tags', []);
    const articleLength = articles.length;
    const { large } = Global.breakpoints;
    const pageOffset = this.state.currentBreakpoint === large.label ? 2 : 1;
    const { pagination, totalPages } = getPagination(
      articleLength,
      5,
      pageOffset,
      this.state.selectedPage
    );
    const currentPage = this.state.selectedPage;

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
            {articles
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
          {articles
            .slice(this.state.selectedPage * 5 - 5, this.state.selectedPage * 5)
            .map(article => (
              <ArticlePreview key={article.id} article={article} />
            ))}
          <div className="w100 flex flex-row justify-end flex-wrap items-center px2">
            <Button
              className={cx(
                { 'display-none': currentPage === 1 || totalPages <= 1 },
                'mr1 transition'
              )}
              onClick={() => this.setState({ selectedPage: currentPage - 1 })}
              variant="style-none"
            >
              <Image
                className={cx(
                  styles['ArticlesLanding__pagination-image'],
                  'mr1'
                )}
                src="/assets/images/icon-pagination-previous-arrow.svg"
              />
              <p className="copy text-peach bold xs-hide sm-hide">Previous</p>
            </Button>
            <Button
              className={cx(
                { 'display-none': pagination.includes(1) || totalPages <= 1 },
                'copy text-peach bold'
              )}
              onClick={() => this.setState({ selectedPage: 1 })}
              variant="style-none"
              label="1"
            />
            <p
              className={cx(
                {
                  'display-none':
                    pagination.includes(1) ||
                    pagination.includes(2) ||
                    totalPages <= 1
                },
                'copy text-peach bold mx1'
              )}
            >
              ...
            </p>
            {pagination.map(page => (
              <Button
                className={cx(
                  styles['ArticlesLanding__pagination-number'],
                  'copy text-peach bold'
                )}
                key={page}
                onClick={() => this.setState({ selectedPage: page })}
                variant="style-none"
                label={`${page}`}
              />
            ))}
            <p
              className={cx(
                {
                  'display-none':
                    pagination.includes(totalPages) ||
                    pagination.includes(totalPages - 1) ||
                    totalPages <= 1
                },
                'copy text-peach bold mx1'
              )}
            >
              ...
            </p>
            <Button
              className={cx(
                {
                  'display-none':
                    pagination.includes(totalPages) || totalPages <= 1
                },
                'copy text-peach bold'
              )}
              onClick={() => this.setState({ selectedPage: totalPages })}
              variant="style-none"
              label={`${totalPages}`}
            />
            <Button
              className={cx(
                {
                  'display-none': currentPage === totalPages || totalPages <= 1
                },
                'ml1 transition'
              )}
              onClick={() => this.setState({ selectedPage: currentPage + 1 })}
              variant="style-none"
            >
              <p className="copy text-peach bold xs-hide sm-hide">Next</p>
              <Image
                className={cx(
                  styles['ArticlesLanding__pagination-image'],
                  'ml1'
                )}
                src="/assets/images/icon-pagination-next-arrow.svg"
              />
            </Button>
          </div>
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
            const buttonIsSelected =
              get(this, 'props.selectedTags', []).indexOf(tag) > -1;

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
  articles: PropTypes.arrayOf(articleModel.propTypes),
  tags: PropTypes.array
};

ArticlesLanding.defaultProps = {
  articles: [],
  tags: []
};

export default ArticlesLanding;

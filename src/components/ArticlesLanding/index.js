import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import articleModel from 'models/articleModel';
import { FacebookShareButton } from 'react-share';
import { Image, Button } from 'components/base';

import styles from './ArticlesLanding.scss';
import ArticlePreview from 'components/ArticlePreview';
import RecentArticle from 'components/RecentArticle';

class ArticlesLanding extends Component {
  state = {
    selectedTagButton: '',
    selectedPage: 1
  };

  handleTagButtonClick = tag => {
    const fetchArticles = get(this, 'props.actions.fetchArticles', () => {});

    if (tag === this.state.selectedTagButton) {
      fetchArticles();
      return this.setState({ selectedTagButton: '' });
    }
    fetchArticles(null, tag);
    this.setState({ selectedTagButton: tag });
  };

  handlePaginationClick = (cursor, pageNumber) => {
    this.setState({ selectedPage: pageNumber });
    const fetchArticles = get(this, 'props.actions.fetchArticles', () => {});

    if (pageNumber === 1) {
      return fetchArticles();
    }

    return fetchArticles(cursor);
  };

  sortPagination = cursors => {
    const pagination = cursors.map((cursor, i) => i + 1);
    const currentPage = this.state.selectedPage;
    const pageBefore = currentPage - 3 >= 0 ? currentPage - 3 : 0;
    const pageAfter =
      currentPage + 2 <= pagination.length
        ? currentPage + 2
        : pagination.length;

    return pagination.slice(pageBefore, pageAfter);
  };

  render() {
    const { articles, tags, cursors } = this.props;
    const getArticles = get(articles, 'articles', []);
    const cursorsLength = cursors.length;
    const currentPage = this.state.selectedPage;
    const paginations = this.sortPagination(cursors);

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
          <div className={cx(styles['ArticlesLanding__pagination-container'])}>
            <div
              className={cx(
                { 'display-none': cursorsLength < 1 },
                'flex flex-row w100 justify-end px2 transition'
              )}
            >
              {currentPage !== 1 ? (
                <Button
                  className="mr1"
                  onClick={() =>
                    this.handlePaginationClick(
                      cursors[currentPage - 3],
                      currentPage - 1
                    )
                  }
                  variant="style-none"
                >
                  <Image
                    className={cx(
                      styles['ArticlesLanding__pagination-image'],
                      'mr1'
                    )}
                    src="/assets/images/icon-pagination-previous-arrow.svg"
                  />
                  <p className="copy text-peach bold">Previous</p>
                </Button>
              ) : null}
              {paginations[0] !== 1 ? (
                <Fragment>
                  <Button
                    className="copy text-peach bold"
                    onClick={() => this.handlePaginationClick('', 1)}
                    variant="style-none"
                    label="1"
                  />
                  <p className="copy text-peach bold mx1">...</p>
                </Fragment>
              ) : null}
              {paginations.map(pagination => (
                <Button
                  className={cx(
                    styles['ArticlesLanding__pagination-number'],
                    'copy text-peach bold'
                  )}
                  key={pagination}
                  onClick={() =>
                    this.handlePaginationClick(
                      cursors[pagination - 2],
                      pagination
                    )
                  }
                  variant="style-none"
                  label={`${pagination}`}
                />
              ))}
              {paginations[paginations.length - 1] !== cursorsLength ? (
                <Fragment>
                  <p className="copy text-peach bold mx1">...</p>
                  <Button
                    className="copy text-peach bold"
                    onClick={() =>
                      this.handlePaginationClick(
                        cursors[cursorsLength - 2],
                        cursorsLength
                      )
                    }
                    variant="style-none"
                    label={`${cursorsLength}`}
                  />
                </Fragment>
              ) : null}
              {currentPage !== cursorsLength ? (
                <Button
                  className="ml1"
                  onClick={() =>
                    this.handlePaginationClick(
                      cursors[currentPage - 1],
                      currentPage + 1
                    )
                  }
                  variant="style-none"
                >
                  <p className="copy text-peach bold">Next</p>
                  <Image
                    className={cx(
                      styles['ArticlesLanding__pagination-image'],
                      'ml1'
                    )}
                    src="/assets/images/icon-pagination-next-arrow.svg"
                  />
                </Button>
              ) : null}
            </div>
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

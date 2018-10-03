import React, { Component, Fragment } from 'react';
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

class NewsLanding extends Component {
  state = {
    selectedPage: 1
  };

  handlePaginationClick = (cursor, pageNumber) => {
    this.setState({ selectedPage: pageNumber });
    const fetchNews = get(this, 'props.actions.fetchNews', () => {});

    if (pageNumber === 1) {
      return fetchNews();
    }

    return fetchNews(cursor);
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
    const { news, actions, cursors } = this.props;
    const cursorsLength = cursors.length;
    const currentPage = this.state.selectedPage;
    const articles = get(news, 'articles', []);
    const test = get(articles[4], 'cursor', '');
    const paginations = this.sortPagination(cursors);

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
                  className={cx(styles['NewsLanding__pagination-image'], 'mr1')}
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
                  styles['NewsLanding__pagination-number'],
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
                label={pagination}
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
                  label={cursorsLength}
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
                  className={cx(styles['NewsLanding__pagination-image'], 'ml1')}
                  src="/assets/images/icon-pagination-next-arrow.svg"
                />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

NewsLanding.propTypes = {
  news: PropTypes.shape({
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    articles: PropTypes.arrayOf(articleModel.propTypes)
  }),
  actions: PropTypes.object,
  cursors: PropTypes.arrayOf(PropTypes.string)
};

NewsLanding.defaultProps = {
  news: PropTypes.shape({
    hasNextPage: false,
    hasPreviousPage: false,
    articles: PropTypes.arrayOf(articleModel.default)
  }),
  actions: {},
  cursors: ['']
};

export default NewsLanding;

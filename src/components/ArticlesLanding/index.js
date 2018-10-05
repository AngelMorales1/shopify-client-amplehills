import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import articleModel from 'models/articleModel';
import { Image, Button } from 'components/base';

import styles from './ArticlesLanding.scss';
import ArticlePreview from 'components/ArticlePreview';
import RecentArticle from 'components/RecentArticle';

class ArticlesLanding extends Component {
  state = {
    selectedTagButton: {},
    selectedPage: 1
  };

  handleTagButtonClick = tag => {
    this.setState({ selectedPage: 1 });
    const tagButtons = this.state.selectedTagButton;

    if (this.state.selectedTagButton[tag]) {
      delete tagButtons[tag];

      return this.setState({ selectedTagButton: tagButtons });
    }

    tagButtons[tag] = true;
    this.setState({ selectedTagButton: tagButtons });
  };

  getPagination = (articlesAmount, articlesPerPage) => {
    const pageLeftover = articlesAmount % articlesPerPage > 0 ? 1 : 0;
    const totalPages =
      Math.floor(articlesAmount / articlesPerPage) + pageLeftover;
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    const currentPage = this.state.selectedPage;
    const pageBefore = currentPage - 3 >= 0 ? currentPage - 3 : 0;
    const pageAfter =
      currentPage + 2 <= totalPages ? currentPage + 2 : totalPages;

    return { paginations: pages.slice(pageBefore, pageAfter), totalPages };
  };

  render() {
    const articles = get(this, 'props.articles', []).filter(article => {
      const selectedTags = Object.keys(this.state.selectedTagButton);
      if (!selectedTags.length) {
        return true;
      } else {
        const articlesTags = Object.keys(article.tags);
        for (let i = 0; i < articlesTags.length; i++) {
          if (this.state.selectedTagButton[articlesTags[i]]) {
            return true;
          }
        }

        return false;
      }
    });
    const tags = get(this, 'props.tags', []);
    const articleLength = articles.length;
    const { paginations, totalPages } = this.getPagination(articleLength, 5);
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
          <div
            className={cx(
              styles['ArticlesLanding__pagination-container'],
              'w100 flex flex-row justify-end items-center'
            )}
          >
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
              <p className="copy text-peach bold">Previous</p>
            </Button>
            <Button
              className={cx(
                { 'display-none': paginations.includes(1) || totalPages <= 1 },
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
                    paginations.includes(1) ||
                    paginations.includes(2) ||
                    totalPages <= 1
                },
                'copy text-peach bold mx1'
              )}
            >
              ...
            </p>
            {paginations.map(pagination => (
              <Button
                className={cx(
                  styles['ArticlesLanding__pagination-number'],
                  'copy text-peach bold'
                )}
                key={pagination}
                onClick={() => this.setState({ selectedPage: pagination })}
                variant="style-none"
                label={`${pagination}`}
              />
            ))}
            <p
              className={cx(
                {
                  'display-none':
                    paginations.includes(totalPages) ||
                    paginations.includes(totalPages - 1) ||
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
                    paginations.includes(totalPages) || totalPages <= 1
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
              <p className="copy text-peach bold">Next</p>
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
            const buttonIsSelected = this.state.selectedTagButton[tag];

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

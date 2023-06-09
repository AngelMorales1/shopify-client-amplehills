import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  GooglePlusShareButton
} from 'react-share';
import { Link } from 'react-router-dom';
import articleModel from 'models/articleModel';

import styles from './ArticleDetail.scss';
import { Image, Button } from 'components/base';
import Breadcrumbs from 'components/Breadcrumbs';

const ArticleDetail = ({ article, newsArticles }) => {
  const breadcrumbs = [
    {
      to: '/news',
      label: 'Back to news'
    }
  ];

  const previousArticle = newsArticles[article.index - 1];
  const nextArticle = newsArticles[article.index + 1];
  const articleIsFirstOne = article.index === 0;
  const articleIsLastOne =
    article.index === newsArticles[newsArticles.length - 1].index;

  return (
    <div className={cx(styles['ArticleDetail'])}>
      <div className="flex flex-row justify-between items-center mx-auto container-width">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          className={cx(
            styles['ArticleDetail__breadcrumbs'],
            'transition-slide-up'
          )}
        />
        <FacebookShareButton
          className="md-hide lg-hide mr2"
          url={get(window, 'location.href', '')}
        >
          <Button
            className={cx(styles['ArticleDetail__share-button'])}
            variant="primary-small"
            color="white-madison-blue-border"
            label="Share"
          />
        </FacebookShareButton>
      </div>
      <div className="flex flex-column items-center form-container-width mx-auto px3">
        <h2
          className={cx(
            styles['ArticleDetail__title'],
            'bold center text-container-width mt3'
          )}
        >
          {article.title}
        </h2>
        <p className="line-item-title text-peach my2">{article.publishedAt}</p>
        <div
          className={cx(styles['ArticleDetail__content'], 'mb3')}
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
        <div className="self-start block-subheadline my3">
          <p className="uppercase">Date</p>
          <p>{article.publishedAt}</p>
        </div>
        <div className="self-start block-subheadline">
          <p className="uppercase">Written By</p>
          <p>{article.authorName}</p>
        </div>
      </div>
      <div className="form-container-width mx-auto px2 my4 pt3 pb4 xs-hide sm-hide">
        <p className="uppercase text-peach bold my3">share</p>
        <div className="flex flex-row">
          <FacebookShareButton url={get(window, 'location.href', '')}>
            <Button
              className={cx(
                styles['ArticleDetail__share-button'],
                'uppercase mr2'
              )}
              variant="primary-small"
              color="madison-blue"
              label="Facebook"
            />
          </FacebookShareButton>
          <TwitterShareButton url={get(window, 'location.href', '')}>
            <Button
              className={cx(
                styles['ArticleDetail__share-button'],
                'uppercase mr2'
              )}
              variant="primary-small"
              color="madison-blue"
              label="Twitter"
            />
          </TwitterShareButton>
          <PinterestShareButton
            url={get(window, 'location.href', '')}
            media={get(article, 'image', '')}
          >
            <Button
              className={cx(
                styles['ArticleDetail__share-button'],
                'uppercase mr2'
              )}
              variant="primary-small"
              color="madison-blue"
              label="Pinterest"
            />
          </PinterestShareButton>
          <GooglePlusShareButton url={get(window, 'location.href', '')}>
            <Button
              className={cx(styles['ArticleDetail__share-button'], 'uppercase')}
              variant="primary-small"
              color="madison-blue"
              label="Google"
            />
          </GooglePlusShareButton>
        </div>
      </div>
      <div
        className={cx(
          'flex flex-row items-center justify-center mx-auto mt4 px3',
          {
            'container-width': !articleIsFirstOne || !articleIsLastOne,
            'form-container-width': articleIsFirstOne || articleIsLastOne
          }
        )}
      >
        <Link
          to={`/news/${get(previousArticle, 'handle', '')}`}
          className={cx(
            { 'display-none': articleIsFirstOne },
            styles['ArticleDetail__nav-button-container'],
            'relative flex flex-column xs-hide sm-hide self-stretch'
          )}
        >
          <Image
            className={cx(
              styles['ArticleDetail__previous-icon'],
              'absolute self-start'
            )}
            src="/assets/images/icon-pagination-previous-arrow.svg"
          />
          <p className="uppercase text-peach bold">Previous</p>
          <p
            className={cx(
              styles['ArticleDetail__nav-button-title'],
              'bold text-madison-blue'
            )}
          >
            {get(previousArticle, 'title', '')}
          </p>
        </Link>
        <Link
          to={`/news/${get(nextArticle, 'handle', '')}`}
          className={cx(
            { 'display-none': articleIsLastOne },
            styles['ArticleDetail__nav-button-container'],
            'relative flex flex-column self-stretch'
          )}
        >
          <p className="uppercase text-peach bold">Next</p>
          <Image
            className={cx(
              styles['ArticleDetail__next-icon'],
              'absolute self-end'
            )}
            src="/assets/images/icon-pagination-next-arrow.svg"
          />
          <p
            className={cx(
              styles['ArticleDetail__nav-button-title'],
              'bold text-madison-blue'
            )}
          >
            {get(nextArticle, 'title', '')}
          </p>
        </Link>
      </div>
    </div>
  );
};

ArticleDetail.propTypes = {
  article: articleModel.propTypes,
  newsArticles: PropTypes.arrayOf(articleModel.propTypes)
};

ArticleDetail.defaultProps = {
  article: null,
  newsArticles: []
};

export default ArticleDetail;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import { FacebookShareButton } from 'react-share';
import articleModel from 'models/articleModel';

import styles from './ArticlePreview.scss';
import { Button } from 'components/base';

const ArticlePreview = ({ article, index }) => {
  const thisIsfirstArticle = index === 0;
  const firstTwoCentencesFromContent =
    article.content
      .split('. ')
      .slice(0, 2)
      .join('. ') + '.';

  return (
    <div className="px2">
      <Button variant="style-none" to={`/news/${article.handle}`}>
        <div
          className={cx(
            styles['ArticlePreview__image'],
            'col-12 aspect-4-3 absolute'
          )}
          style={{
            background: `url(${contentfulImgUtil(
              article.image,
              '900'
            )}) no-repeat center`,
            backgroundSize: 'cover'
          }}
        />
      </Button>
      <div
        className={cx(
          styles['ArticlePreview__text-container'],
          'text-container-width'
        )}
      >
        <Button
          className={cx(styles['ArticlePreview__button'])}
          variant="style-none"
          to={`/news/${article.handle}`}
        >
          <h2
            className={cx(
              styles['ArticlePreview__title'],
              'bold my2 text-madison-blue avenir'
            )}
          >
            {article.title}
          </h2>
        </Button>
        <p
          className={cx(
            styles['ArticlePreview__date'],
            'detail text-peach semi-bold mb3'
          )}
        >
          {article.publishedAt}
        </p>
        {thisIsfirstArticle ? (
          <Fragment>
            <p className="block-subheadline">{firstTwoCentencesFromContent}</p>
            <div className="flex flex-row my3">
              <Button
                to={`/news/${article.handle}`}
                className="mr2"
                variant="primary-small"
                color="madison-blue"
                label="Read More"
              />
              <FacebookShareButton
                url={`${get(window, 'location.href', '')}/${article.handle}`}
              >
                <Button
                  variant="primary-small"
                  color="white-madison-blue-border"
                  label="Share"
                />
              </FacebookShareButton>
            </div>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

ArticlePreview.propTypes = {
  article: articleModel.propTypes,
  index: PropTypes.number
};

ArticlePreview.defaultProps = {
  article: {},
  index: 0
};

export default ArticlePreview;

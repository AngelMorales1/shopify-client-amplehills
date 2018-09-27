import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { FacebookShareButton } from 'react-share';

import styles from './ArticlePreview.scss';
import { Button, Image } from 'components/base';

const ArticlePreview = ({ article, index }) => {
  const thisIsfirstArticle = index === 0;
  const firstTwoCentencesFromContent =
    article.content
      .split('. ')
      .slice(0, 2)
      .join('. ') + '.';

  return (
    <div className="px2">
      <Link to={`/news/${article.handle}`}>
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
      </Link>
      <div
        className={cx(
          styles['ArticlePreview__text-container'],
          'text-container-width'
        )}
      >
        <Link to={`/news/${article.handle}`} className="text-decoration-none">
          <h2
            className={cx(
              styles['ArticlePreview__title'],
              'bold my2 text-madison-blue avenir'
            )}
          >
            {article.title}
          </h2>
        </Link>
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

ArticlePreview.propTypes = {};

ArticlePreview.defaultProps = {};

export default ArticlePreview;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';

import styles from './ArticlePreview.scss';
import { Button, Image } from 'components/base';

const ArticlePreview = ({ article, index }) => {
  const thisIsfirstArticle = index === 0;
  return (
    <div>
      <Image src={article.image} />
      <h2>{article.title}</h2>
      <p>{article.publishedAt}</p>
      {thisIsfirstArticle ? (
        <Fragment>
          <p>
            {article.content
              .split('. ')
              .slice(0, 2)
              .join('. ') + '.'}
          </p>
          <div>
            <Button label="Read More" />
            <Button label="Share" />
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

ArticlePreview.propTypes = {};

ArticlePreview.defaultProps = {};

export default ArticlePreview;

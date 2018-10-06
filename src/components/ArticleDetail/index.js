import React from 'react';
import get from 'utils/get';
import cx from 'classnames';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import { FacebookShareButton } from 'react-share';
import articleModel from 'models/articleModel';

import styles from './ArticleDetail.scss';
import { Button } from 'components/base';
import Breadcrumbs from 'components/Breadcrumbs';

const ArticleDetail = ({ article }) => {
  const breadcrumbs = [
    {
      to: '/news',
      label: 'Back to news'
    }
  ];
  return (
    <div className={cx(styles['ArticleDetail'])}>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        className={cx(
          styles['ArticleDetail__breadcrumbs'],
          'transition-slide-up mx-auto container-width'
        )}
      />
      <div className="flex flex-column items-center form-container-width mx-auto px2">
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
    </div>
  );
};

ArticleDetail.propTypes = {
  article: articleModel.propTypes
};

ArticleDetail.defaultProps = {
  article: {}
};

export default ArticleDetail;

import React from 'react';
import get from 'utils/get';
import cx from 'classnames';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import { FacebookShareButton } from 'react-share';
import articleModel from 'models/articleModel';
import styles from './ArticleDetail.scss';
import { Button } from 'components/base';
const ArticleDetail = ({ article }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.publishedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
      <div>
        <p>Date</p>
        <p>{article.publishedAt}</p>
      </div>
      <div>
        <p>Written By</p>
        <p>{article.authorName}</p>
      </div>
    </div>
  );
};
ArticleDetail.propTypes = {};
ArticleDetail.defaultProps = {};
export default ArticleDetail;

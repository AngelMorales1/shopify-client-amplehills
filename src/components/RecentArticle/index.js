import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import articleModel from 'models/articleModel';

import styles from './RecentArticle.scss';

const RecentArticle = ({ article }) => {
  return (
    <div className="my1">
      <Link to={`/news/${article.handle}`} className="text-decoration-none">
        <p className={cx(styles['RecentArticle__title'], 'avenir bold')}>
          {article.title}
        </p>
      </Link>
      <p className="text-peach detail">{article.publishedAt}</p>
    </div>
  );
};

RecentArticle.propTypes = {
  article: articleModel.propTypes
};

RecentArticle.defaultProps = {
  article: articleModel.default
};

export default RecentArticle;

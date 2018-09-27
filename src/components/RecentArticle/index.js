import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { Image, Button } from 'components/base';
import styles from './RecentArticle.scss';

const RecentArticle = ({ article }) => {
  return (
    <div className="my2">
      <Link to={`/news/${article.handle}`} className="text-decoration-none">
        <p className={cx(styles['RecentArticle__title'], 'avenir bold')}>
          {article.title}
        </p>
      </Link>
      <p className="text-peach detail">{article.publishedAt}</p>
    </div>
  );
};

RecentArticle.propTypes = {};

RecentArticle.defaultProps = {};

export default RecentArticle;

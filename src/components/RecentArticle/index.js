import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { Image, Button } from 'components/base';
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
  article: PropTypes.shape({
    authorEmail: PropTypes.string,
    authorName: PropTypes.string,
    content: PropTypes.string,
    contentHtml: PropTypes.string,
    cursor: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    publishedAt: PropTypes.string,
    tags: PropTypes.object,
    title: PropTypes.string
  })
};

RecentArticle.defaultProps = {
  article: {
    authorEmail: '',
    authorName: '',
    content: '',
    contentHtml: '',
    cursor: '',
    handle: '',
    id: '',
    image: '',
    publishedAt: '',
    tags: {},
    title: ''
  }
};

export default RecentArticle;

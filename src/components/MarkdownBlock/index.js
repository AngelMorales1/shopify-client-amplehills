import React from 'react';
import marked from 'marked';

import cx from 'classnames';

import styles from './GenericPage.scss';

const MarkdownBlock = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: marked(content) }}
      className={cx(
        styles['MarkdownBlock'],
        'form-container-width transition-slide-up mx-auto px3 py4'
      )}
    />
  );
};

export default MarkdownBlock;

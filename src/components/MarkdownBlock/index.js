import React from 'react';
import marked from 'marked';

import cx from 'classnames';
import get from 'utils/get';

import styles from './GenericPage.scss';

const MarkdownBlock = props => {
  const markdown = get(props, 'block.fields.content', '');

  return (
    <div
      dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      className={cx(
        styles['MarkdownBlock'],
        'form-container-width transition-slide-up mx-auto px3 py4'
      )}
    />
  );
};

export default MarkdownBlock;

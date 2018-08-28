import React from 'react';
import marked from 'marked';

import cx from 'classnames';
import get from 'utils/get';

import styles from './GenericPage.scss';

const MarkdownBlock = props => {
  const { z, block } = props;
  const fields = get(block, 'fields', {});
  const markdown = get(fields, 'content', '');
  const isDripOn = get(fields, 'drip', false);
  const colorClass = `MarkdownBlock--${get(
    fields,
    'backgroundColor',
    'white'
  )}`;
  const titleOnLeft = get(fields, 'titleLeft', false);
  const title = get(fields, 'title', '');

  return (
    <div
      style={{ zIndex: z }}
      className={cx(styles[colorClass], 'flex justify-center', {
        [styles['MarkdownBlock--title-left']]: titleOnLeft,
        drip: isDripOn
      })}
    >
      {titleOnLeft ? (
        <div
          className={cx(
            styles['MarkdownBlock__title-container'],
            'col-12 md-col-4 flex flex-row justify-center'
          )}
        >
          <span className="block-headline">{title}</span>
        </div>
      ) : null}
      <div
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        className={cx(
          styles['MarkdownBlock'],
          'form-container-width transition-slide-up mx-auto px3 py4',
          { 'col-12 md-col-8': titleOnLeft }
        )}
      />
    </div>
  );
};

export default MarkdownBlock;

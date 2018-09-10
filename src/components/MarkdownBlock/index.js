import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import cx from 'classnames';
import get from 'utils/get';

import styles from './MarkdownBlock.scss';

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
          'transition-slide-up mx-auto px3 py4 form-container-width markdown-block',
          {
            'col-12 md-col-8': titleOnLeft
          }
        )}
      />
    </div>
  );
};

MarkdownBlock.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      backgroudColor: PropTypes.string,
      content: PropTypes.string,
      title: PropTypes.string,
      titleLeft: PropTypes.bool,
      drip: PropTypes.bool
    })
  })
};

MarkdownBlock.defaultProps = {
  z: 0,
  block: {
    fields: {
      backgroudColor: 'white',
      content: '',
      title: '',
      titleLeft: false,
      drip: false
    }
  }
};

export default MarkdownBlock;

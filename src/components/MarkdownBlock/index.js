import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import cx from 'classnames';
import get from 'utils/get';

import styles from './MarkdownBlock.scss';

const MarkdownBlock = props => {
  const { z, block, setRef } = props;
  const fields = get(block, 'fields', {});
  const markdown = get(fields, 'content', '');
  const markdown2 = get(fields, 'content2', '');
  const isDripOn = get(fields, 'drip', false);
  const colorClass = `MarkdownBlock--${get(
    fields,
    'backgroundColor',
    'white'
  )}`;
  const titleOnLeft = get(fields, 'titleLeft', false);
  const titleOnCenter = get(fields, 'titleCenterAlign', false);
  const title = get(fields, 'title', '');
  const twoColumnContentIsTrue = get(fields, 'twoColumnContent', false);

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(styles[colorClass], 'flex justify-center px3')}
    >
      <div
        className={cx('w100 flex content-width', {
          [styles['MarkdownBlock--title-left']]: titleOnLeft,
          drip: isDripOn
        })}
      >
        {titleOnLeft ? (
          <div
            className={cx(
              styles['MarkdownBlock__title-container'],
              'col-12 md-col-4',
              {
                [styles[
                  'MarkdownBlock__title-container--center'
                ]]: titleOnCenter
              }
            )}
          >
            <h2 className="block-headline">{title}</h2>
          </div>
        ) : null}
        <div
          className={cx('transition-slide-up mx-auto py4', {
            'col-12 md-col-8': titleOnLeft,
            'content-width': twoColumnContentIsTrue,
            [styles[
              'MarkdownBlock__content-container--two-column'
            ]]: twoColumnContentIsTrue
          })}
        >
          <div
            dangerouslySetInnerHTML={{ __html: marked(markdown) }}
            className={cx(
              styles['MarkdownBlock__content'],
              'col-12 markdown-block form-container-width',
              {
                'md-col-6': twoColumnContentIsTrue
              }
            )}
          />
          {twoColumnContentIsTrue ? (
            <div
              dangerouslySetInnerHTML={{ __html: marked(markdown2) }}
              className={cx(
                styles['MarkdownBlock__content'],
                'col-12 markdown-block form-container-width ',
                {
                  'md-col-6': twoColumnContentIsTrue
                }
              )}
            />
          ) : null}
        </div>
      </div>
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
      drip: PropTypes.bool,
      titleCenterAlign: PropTypes.bool
    })
  }),
  setRef: PropTypes.func
};

MarkdownBlock.defaultProps = {
  z: 0,
  block: {
    fields: {
      backgroudColor: 'white',
      content: '',
      title: '',
      titleLeft: false,
      drip: false,
      titleCenterAlign: false
    }
  },
  setRef: () => {}
};

export default MarkdownBlock;

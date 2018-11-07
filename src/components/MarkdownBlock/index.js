import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import cx from 'classnames';
import get from 'utils/get';
import { Button } from 'components/base';

import styles from './MarkdownBlock.scss';

const MarkdownBlock = props => {
  const { z, block, setRef } = props;
  const fields = get(block, 'fields', {});
  const markdown = get(fields, 'content', '');
  const button1Label = get(fields, 'button1Label', '');
  const button1Link = get(fields, 'button1Link', '');
  const button1Text = get(fields, 'button1Text', '');
  const button2Label = get(fields, 'button2Label', '');
  const button2Link = get(fields, 'button2Link', '');
  const button2Text = get(fields, 'button2Text', '');
  const markdown2 = get(fields, 'content2', '');
  const isDripOn = get(fields, 'drip', false);
  const colorClass = `MarkdownBlock--${get(
    fields,
    'backgroundColor',
    'white'
  )}`;
  const titleOnLeft = get(fields, 'titleLeft', false);
  const titleOnTop = get(fields, 'titleTop', false);
  const titleOnLeftCenter = get(fields, 'titleCenterAlign', false);
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
          [styles['MarkdownBlock--title-top']]: titleOnTop,
          drip: isDripOn
        })}
      >
        {titleOnLeft || titleOnTop ? (
          <div
            className={cx(
              styles['MarkdownBlock__title-container'],
              'col-12 md-col-4',
              {
                [styles[
                  'MarkdownBlock__title-container--center'
                ]]: titleOnLeftCenter
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
          {button1Label || button1Link || button1Text ? (
            <div
              className={cx(
                styles['MarkdownBlock__button-container'],
                'flex flex-column mb3'
              )}
            >
              <div
                dangerouslySetInnerHTML={{ __html: marked(button1Text) }}
                className={cx(
                  styles['MarkdownBlock__button-text'],
                  'markdown-block'
                )}
              />
              <Button
                className="inline-flex"
                color="peach"
                label={button1Label}
                to={button1Link}
              />
            </div>
          ) : (
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
          )}
          {twoColumnContentIsTrue ? (
            <div
              className={cx(
                styles['MarkdownBlock__content-container'],
                'col-12',
                {
                  'md-col-6': twoColumnContentIsTrue
                }
              )}
            >
              {button2Label || button2Link || button2Text ? (
                <div
                  className={cx(
                    styles['MarkdownBlock__button-container'],
                    'flex flex-column mb3'
                  )}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: marked(button2Text) }}
                    className={cx(
                      styles['MarkdownBlock__button-text'],
                      'markdown-block'
                    )}
                  />
                  <Button
                    className="inline-flex"
                    color="peach"
                    label={button2Label}
                    to={button1Link}
                  />
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: marked(markdown2) }}
                  className={cx(
                    styles['MarkdownBlock__content'],
                    'w100 markdown-block form-container-width'
                  )}
                />
              )}
            </div>
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
      titleCenterAlign: PropTypes.bool,
      button1Label: PropTypes.string,
      button1Link: PropTypes.string,
      button1Text: PropTypes.string,
      button2Label: PropTypes.string,
      button2Link: PropTypes.string,
      button2Text: PropTypes.string
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
      titleCenterAlign: false,
      button1Label: '',
      button1Link: '',
      button1Text: '',
      button2Label: '',
      button2Link: '',
      button2Text: ''
    }
  },
  setRef: () => {}
};

export default MarkdownBlock;

import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import cx from 'classnames';
import get from 'utils/get';
import { Button, PortableText } from 'components/base';

import styles from './TextBlock.scss';

const TextBlock = props => {
  const { z, block, setRef } = props;

  const text = get(block, 'text', '');
  const button1Label = get(block, 'button1Label', '');
  const button1Link = get(block, 'button1Link', '');
  const button1Text = get(block, 'button1Text', '');
  const button2Label = get(block, 'button2Label', '');
  const button2Link = get(block, 'button2Link', '');
  const button2Text = get(block, 'button2Text', '');
  const markdown2 = get(block, 'content2', '');
  const dripIsOn = get(block, 'drip', false);
  const upperDripIsOn = get(block, 'upperDrip', false);
  const colorClass = `TextBlock--${get(block, 'backgroundColor', 'white')}`;
  const titleOnLeft = get(block, 'titleOnLeft', false);
  const titleOnTop = get(block, 'titleTop', false);
  const titleOnLeftCenter = get(block, 'titleOnLeftVerticallyCentered', false);
  const title = get(block, 'title', '');
  const twoColumnContentIsTrue = get(block, 'twoColumnContent', false);

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(styles[colorClass], 'flex justify-center px3')}
    >
      <div
        className={cx('w100 flex content-width', {
          [styles['TextBlock--title-left']]: titleOnLeft,
          [styles['TextBlock--title-top']]: titleOnTop,
          drip: dripIsOn,
          'upper-drip': upperDripIsOn
        })}
      >
        {title && (titleOnLeft || titleOnTop) ? (
          <div
            className={cx(
              styles['TextBlock__title-container'],
              'col-12 md-col-4',
              {
                [styles[
                  'TextBlock__title-container--center'
                ]]: titleOnLeftCenter,
                [styles['TextBlock__title-container--left']]: titleOnLeft
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
              'TextBlock__content-container--two-column'
            ]]: twoColumnContentIsTrue
          })}
        >
          {button1Label || button1Link || button1Text ? (
            <div
              className={cx(
                styles['TextBlock__button-container'],
                'flex flex-column mb3'
              )}
            >
              <div
                dangerouslySetInnerHTML={{ __html: marked(button1Text) }}
                className={cx(
                  styles['TextBlock__button-text'],
                  'markdown-block'
                )}
              />
              <Button
                variant="primary-responsive"
                className="inline-flex"
                color="peach"
                label={button1Label}
                to={button1Link}
              />
            </div>
          ) : (
            <div
              className={cx(
                styles['TextBlock__content'],
                'col-12 portable-text form-container-width',
                {
                  'md-col-6': twoColumnContentIsTrue
                }
              )}
            >
              <PortableText blocks={text} />
            </div>
          )}
          {twoColumnContentIsTrue ? (
            <div
              className={cx(styles['TextBlock__content-container'], 'col-12', {
                'md-col-6': twoColumnContentIsTrue
              })}
            >
              {button2Label || button2Link || button2Text ? (
                <div
                  className={cx(
                    styles['TextBlock__button-container'],
                    'flex flex-column mb3'
                  )}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: marked(button2Text) }}
                    className={cx(
                      styles['TextBlock__button-text'],
                      'markdown-block'
                    )}
                  />
                  <Button
                    variant="primary-responsive"
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
                    styles['TextBlock__content'],
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

TextBlock.propTypes = {
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

TextBlock.defaultProps = {
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

export default TextBlock;

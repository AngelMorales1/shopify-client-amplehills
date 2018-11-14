import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import marked from 'marked';

import imageModel from 'models/imageModel';
import styles from './GenericHero.scss';
import { Image, Button } from 'components/base';

const GenericHero = ({ block, z }) => {
  const fields = get(block, 'fields', {});
  const title = get(fields, 'title', '');
  const image1 = get(fields, 'image1', null);
  const image2 = get(fields, 'image2', null);
  const dripIsOn = get(fields, 'drip', false);
  const upperDripIsOn = get(fields, 'upperDrip', false);
  const colorClass = `GenericHero--${get(fields, 'color', 'white')}`;
  const text = get(fields, 'text', '');
  const imageRight = get(fields, 'imageRight', false);
  const isReverseArrangement = get(fields, 'isReverseArrangement', false);
  const buttonLabel = get(fields, 'buttonLabel', '');
  const buttonLink = get(fields, 'buttonLink', '');
  const blockHasButton = !!buttonLabel && !!buttonLink;
  const classes = cx(
    styles[colorClass],
    {
      pb4: !dripIsOn,
      drip: dripIsOn,
      'upper-drip': upperDripIsOn
    },
    'pb2 z-sub-nav'
  );

  return (
    <div style={{ zIndex: z }} className={classes}>
      <div
        className={cx(
          styles['GenericHero__content-container'],
          'flex justify-center content-width mx-auto',
          {
            'justify-between': imageRight,
            [styles['GenericHero__content-container--reverse']]:
              imageRight && isReverseArrangement,
            [styles['GenericHero__two-images']]: image1 && image2
          }
        )}
      >
        {image1 && image2 ? (
          <Image
            className={cx(styles['GenericHero__image'], 'col-7 md-col-2 m2')}
            alt={`${title} image`}
            src={contentfulImgUtil(
              get(image1, 'fields.file.url', ''),
              '1400',
              'png'
            )}
          />
        ) : null}
        <div className="col-12 md-col-6 flex justify-center">
          <div
            className={cx(
              {
                [styles['GenericHero__text-container--image-right']]: imageRight
              },
              'transition-slide-up py4 px2 col-10 md-col-8 center'
            )}
          >
            <p className="block-headline pt3">{title}</p>
            {text ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(text)
                }}
                className="markdown-block pt3"
              />
            ) : null}
            {image1 && !imageRight && !image2 ? (
              <Image
                className={cx(styles['GenericHero__image'], 'w100 pt3')}
                alt={`${title} image`}
                src={contentfulImgUtil(
                  get(image1, 'fields.file.url', ''),
                  '1400',
                  'png'
                )}
              />
            ) : null}
            {blockHasButton ? (
              <div>
                <Button
                  className={cx(
                    styles['GenericHero__button'],
                    'inline-flex mt3'
                  )}
                  color="madison-blue"
                  label={buttonLabel}
                  to={buttonLink}
                />
              </div>
            ) : null}
          </div>
        </div>
        {imageRight ? (
          <div className="col-12 md-col-6 flex flex-row items-center justify-center ">
            <Image
              className={cx(styles['GenericHero__image'], 'col-10 my4')}
              alt={`${title} image`}
              src={contentfulImgUtil(
                get(image1, 'fields.file.url', ''),
                '1400',
                'png'
              )}
            />
          </div>
        ) : null}
        {image2 ? (
          <Image
            className={cx(styles['GenericHero__image'], 'col-7 md-col-2 m2')}
            alt={`${title} image`}
            src={contentfulImgUtil(
              get(image2, 'fields.file.url', ''),
              '1400',
              'png'
            )}
          />
        ) : null}
      </div>
    </div>
  );
};

GenericHero.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      color: PropTypes.string,
      drip: PropTypes.bool,
      image1: imageModel.propTypes,
      title: PropTypes.string,
      text: PropTypes.string,
      buttonLink: PropTypes.string,
      buttonLabel: PropTypes.string
    })
  })
};

GenericHero.defaultProps = {
  z: 1,
  block: {
    fields: {
      color: 'blue',
      drip: false,
      image1: null,
      title: '',
      text: '',
      buttonLink: '',
      buttonLabel: ''
    }
  }
};

export default GenericHero;

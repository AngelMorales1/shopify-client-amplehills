import React from 'react';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';

import styles from './GenericHero.scss';
import { Image, Button } from 'components/base';

const GenericHero = ({ block, z }) => {
  const fields = get(block, 'fields', {});
  const title = get(fields, 'title', '');
  const image1 = get(fields, 'image1', null);
  const isDripOn = get(fields, 'drip', false);
  const colorClass = `GenericHero--${get(fields, 'color', 'blue')}`;
  const text = get(fields, 'text', '');
  const imageRight = get(fields, 'imageRight', false);
  const isReverseArrangement = get(fields, 'isReverseArrangement', false);
  const buttonLabel = get(fields, 'buttonLabel', '');
  const buttonLink = get(fields, 'buttonLink', '');
  const blockHasButton = !!buttonLabel && !!buttonLink;
  const classes = cx(
    styles[colorClass],
    {
      pb4: !isDripOn,
      drip: isDripOn
    },
    'pb2 z-sub-nav'
  );

  return (
    <div style={{ zIndex: z }} className={classes}>
      <div
        className={cx(
          styles['GenericHero__content-container'],
          'flex justify-center',
          {
            'justify-between': imageRight,
            [styles['GenericHero__content-container--reverse']]:
              imageRight && isReverseArrangement
          }
        )}
      >
        <div className="col-12 md-col-6 flex justify-center">
          <div
            className={cx(
              {
                [styles['GenericHero__text-container--image-right']]: imageRight
              },
              'transition-slide-up py4 px2 col-10 md-col-8 center'
            )}
          >
            <p className="block-headline pb3">{title}</p>
            {text ? <div className="block-subheadline">{text}</div> : null}
            {image1 && !imageRight ? (
              <Image
                className={cx(styles['GenericHero__image'], 'w100')}
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
                  className="inline-flex mt3"
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
    fields: PropTypes.shape({
      color: 'blue',
      drip: false,
      image1: null,
      title: '',
      text: '',
      buttonLink: '',
      buttonLabel: ''
    })
  }
};

export default GenericHero;

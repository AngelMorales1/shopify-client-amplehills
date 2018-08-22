import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import imageModel from 'models/imageModel';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import styles from './ImageText.scss';
import { Image } from 'components/base';

const ImageText = ({ block, z }) => {
  const fields = get(block, 'fields', {});
  const colorClass = `ImageText--${get(fields, 'backgroundColor', 'pink')}`;
  const position = get(fields, 'imagePosition', 0);
  const positionX = get(fields, 'imagePositionX', 0);
  const isReverseArrangement = get(fields, 'isReverseArrangement', false);
  const imageTextRatio = get(fields, 'imageTextRatio', '40:60');
  const isimageTextRatio5050 = imageTextRatio === '50:50';
  const isDripOn = get(fields, 'drip', false);

  return (
    <div
      style={{ zIndex: z }}
      className={cx(
        styles['ImageText'],
        styles[colorClass],
        { drip: isDripOn },
        'flex flex-row justify-center'
      )}
    >
      <div
        className={cx(
          'flex container-width py4',
          styles['ImageText__container'],
          {
            [styles['ImageText__container--reverse']]: isReverseArrangement
          }
        )}
      >
        <div
          className={cx(
            styles['ImageText__text-content'],
            { 'md-col-5': isimageTextRatio5050 },
            { 'md-col-6': !isimageTextRatio5050 },
            'flex flex-column justify-center col-12'
          )}
        >
          <div
            className={cx(
              styles['ImageText__text-content'],
              'flex flex-column justify-center col-12'
            )}
          >
            <div
              className={cx(
                styles['ImageText__text-content'],
                'flex flex-column justify-center col-12'
              )}
            >
              <h2 className="block-headline mb3">{get(fields, 'title', '')}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: marked(get(fields, 'text', ''))
                }}
                className={cx(styles['ImageText__text'], 'block-subheadline')}
              />
            </div>
            <Image
              className={cx(
                styles['ImageText__image'],
                'z-sub-nav mt2 mx-auto'
              )}
              style={{
                transform: `translate(${positionX}%, ${position}%)`
              }}
              className={cx(styles['ImageText__text'], 'block-subheadline')}
            />
          </div>
          <Image
            className={cx(
              styles['ImageText__image'],
              'z-sub-nav mt2 mx-auto'
            )}
            style={{
              transform: `translate(${positionX}%, ${position}%)`
            }}
            className={cx(styles['ImageText__text'], 'block-subheadline')}
          />
        </div>
        <Image
          className={cx(
            styles['ImageText__image'],
            { 'col-6': isimageTextRatio5050 },
            { 'col-4': !isimageTextRatio5050 },
            'z-sub-nav mt2 mx-auto'
          )}
          style={{
            transform: `translate(${positionX}%, ${position}%)`
          }}
          alt={`${get(fields, 'title', '')} illustration`}
          src={contentfulImgUtil(
            get(fields, 'image.fields.file.url', ''),
            '1400',
            'png'
          )}
        />
      </div>
    </div>
  );
}

export default ImageText;

ImageText.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      backgroundColor: PropTypes.string,
      image: imageModel.propTypes,
      imagePosition: PropTypes.number,
      imagePositionX: PropTypes.number,
      text: PropTypes.string,
      title: PropTypes.string,
      isReverseArrangement: PropTypes.bool,
      imageTextRatio: PropTypes.string,
      drip: PropTypes.bool,
      fullImage: PropTypes.bool
    })
  })
};

ImageText.defaultProps = {
  z: 1,
  block: {
    fields: {
      backgroundColor: 'Pink',
      image: imageModel.default,
      imagePosition: 0,
      imagePositionX: 0,
      text: '',
      title: '',
      isReverseArrangement: false,
      imageTextRatio: '50:50',
      drip: false,
      fullImage: false
    }
  }
};

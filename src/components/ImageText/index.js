import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import imageModel from 'models/imageModel';

import styles from './ImageText.scss';
import { Image } from 'components/base';

const ImageText = ({ block, z }) => {
  const fields = get(block, 'fields', {});
  const colorClass = `ImageText--${get(fields, 'backgroundColor', 'pink')}`;
  const position = get(fields, 'imagePosition', 0);

  return (
    <div
      style={{ zIndex: z }}
      className={cx(styles['ImageText'], styles[colorClass], 'flex drip')}
    >
      <div
        className={cx('flex container-width', styles['ImageText__container'])}
      >
        <div
          className={cx(
            styles['ImageText__text-content'],
            'flex flex-column justify-center col-12 md-col-6'
          )}
        >
          <h2 className="block-headline mb3">{get(fields, 'title', '')}</h2>
          <p className="block-subheadline">{get(fields, 'text', '')}</p>
        </div>
        <Image
          className={cx(styles['ImageText__image'], 'z-overlay col-4')}
          style={{ transform: `translateY(${position}%)` }}
          alt={`${get(fields, 'title', '')} illustration`}
          src={get(fields, 'image.fields.file.url', '')}
        />
      </div>
    </div>
  );
};

export default ImageText;

ImageText.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      backgroundColor: PropTypes.string,
      image: imageModel.propTypes,
      imagePosition: PropTypes.number,
      text: PropTypes.string,
      title: PropTypes.string
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
      text: '',
      title: ''
    }
  }
};

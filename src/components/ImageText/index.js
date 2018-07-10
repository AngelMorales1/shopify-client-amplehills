import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import styles from './ImageText.scss';
import { Image } from 'components/base';

const ImageText = ({ block, z }) => {
  const fields = get(block, 'fields', {});
  const colorClass = `ImageText--${get(fields, 'backgroundColor', 'Pink')}`;
  const position = get(fields, 'imagePosition', 0);

  return (
    <div
      style={{ zIndex: z }}
      className={cx('p4 flex drip', styles['ImageText'], styles[colorClass])}
    >
      <div className="flex justify-around px4">
        <Image
          className="z-overlay self-end col-3 square"
          style={{ transform: `translateY(${position}%)` }}
          alt={`${get(fields, 'title', '')} illustration`}
          src={get(fields, 'image.fields.file.url', '')}
        />
        <div className="flex flex-column justify-center my4 col-4">
          <h2 className="block-headline mb3">{get(fields, 'title', '')}</h2>
          <p className="description">{get(fields, 'text', '')}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageText;

ImageText.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fileds: PropTypes.shape({
      backgroundColor: PropTypes.string,
      image: PropTypes.shape({
        fields: PropTypes.shape({
          file: PropTypes.shape({
            url: PropTypes.string
          }),
          title: PropTypes.string
        })
      }),
      imagePosition: PropTypes.number,
      text: PropTypes.string,
      title: PropTypes.string
    })
  })
};

ImageText.defaultProps = {
  z: 1,
  block: {
    fileds: {
      backgroundColor: 'Pink',
      image: {
        fields: {
          file: {
            url: ''
          },
          title: ''
        }
      },
      imagePosition: 0,
      text: '',
      title: ''
    }
  }
};

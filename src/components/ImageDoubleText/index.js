import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import styles from './ImageDoubleText.scss';
import { Image } from 'components/base';

const ImageDoubleText = ({ block, z }) => {
  const fields = get(block, 'fields', {});
  const colorClass = `ImageDoubleText--${get(
    fields,
    'backgroundColor',
    'light-yellow'
  )}`;
  return (
    <div
      style={{ zIndex: z }}
      className={cx(styles['ImageDoubleText'], styles[colorClass], 'p4 drip')}
    >
      <div
        className={cx(
          styles['ImageDoubleText--container'],
          'flex items-center justify-between'
        )}
      >
        <div
          className={cx(styles['ImageDoubleText--image-container'], 'circle')}
          style={{
            background: `url(${get(
              fields,
              'image.fields.file.url',
              ''
            )}) no-repeat center`,
            backgroundSize: 'cover'
          }}
        />
        <div
          className={cx(styles['ImageDoubleText--text-container'], 'md-col-5')}
        >
          <div className="mb3">
            <h2 className="block-headline mb2">{get(fields, 'title1', '')}</h2>
            <p className="copy">{get(fields, 'text1', '')}</p>
          </div>
          <div>
            <h2 className="block-headline mb2">{get(fields, 'title2', '')}</h2>
            <p className="copy">{get(fields, 'text2', '')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ImageDoubleText.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      backgroundColor: PropTypes.string,
      text1: PropTypes.string,
      text2: PropTypes.string,
      title1: PropTypes.string,
      title2: PropTypes.string,
      image: PropTypes.shape({
        fields: PropTypes.shape({
          title: PropTypes.string,
          file: PropTypes.shape({
            url: PropTypes.string
          })
        })
      })
    })
  })
};

ImageDoubleText.defaultProps = {
  z: 1,
  block: {}
};

export default ImageDoubleText;

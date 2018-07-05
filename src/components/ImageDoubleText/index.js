import React, { Component } from 'react';
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
        >
          <Image
            alt={`${get(fields, 'image.fields.title', '')}`}
            src={get(fields, 'image.fields.file.url', '')}
          />
        </div>
        <div
          className={cx(styles['ImageDoubleText--text-container'], 'md-col-5')}
        >
          <div className="mb3">
            <h2 className="block-headline mb2">
              {get(fields, 'firstTitle', '')}
            </h2>
            <p className="copy">{get(fields, 'firstText', '')}</p>
          </div>
          <div>
            <h2 className="block-headline mb2">
              {get(fields, 'secondTitle', '')}
            </h2>
            <p className="copy">{get(fields, 'secondText', '')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDoubleText;

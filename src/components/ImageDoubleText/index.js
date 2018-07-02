import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import styles from './ImageDoubleText.scss';
import { Image } from 'components/base';

class ImageDoubleText extends Component {
  render() {
    const { block, z } = this.props;
    const fields = get(block, 'fields', {});
    const colorClass = `ImageDoubleText--${get(
      fields,
      'backgroundColor',
      'Light-Yellow'
    )}`;
    return (
      <div
        style={{ zIndex: z }}
        className={cx(
          styles['ImageDoubleText'],
          styles[colorClass],
          'flex justify-end relative drip'
        )}
      >
        <div
          className={cx(styles['ImageDoubleText--image'], 'circle absolute')}
        >
          <Image
            alt={`${get(fields, 'image.fields.title', '')} illustration`}
            src={get(fields, 'image.fields.file.url', '')}
          />
        </div>
        <div
          className={cx(
            styles['ImageDoubleText--text-container'],
            'flex flex-column justify-center items-center col-12 md-col-5'
          )}
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
    );
  }
}

export default ImageDoubleText;

import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import styles from './ImageDoubleText.scss';
import { Image } from 'components/base';

class ImageDoubleText extends Component {
  render() {
    const { block } = this.props;
    const fields = get(block, 'fields', {});
    const colorClass = `ImageText--${get(
      fields,
      'backgroundColor',
      'Light-Yellow'
    )}`;
    return (
      <div className={cx(styles['ImageDoubleText'], styles[colorClass])}>
        <div>
          <Image
            alt={`${get(fields, 'image.fields.title', '')} illustration`}
            src={get(fields, 'image.fields.file.url', '')}
          />
        </div>
        <div>
          <div>
            <h2>{get(fields, 'firstTitle', '')}</h2>
            <p>{get(fields, 'firstText', '')}</p>
          </div>
          <div>
            <h2>{get(fields, 'secondTitle', '')}</h2>
            <p>{get(fields, 'secondText', '')}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDoubleText;

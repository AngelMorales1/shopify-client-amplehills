import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import styles from './ImageText.scss';
import { Image } from 'components/base';

class ImageText extends Component {
  render() {
    const { data } = this.props;
    const colorClass = `ImageText--${get(data, 'backgroundColor', 'Pink')}`;
    const position = get(data, 'imagePosition', 0);
    return (
      <div
        className={cx('p4 flex drip', styles['ImageText'], styles[colorClass])}
      >
        <div className="flex justify-around px4">
          <Image
            className="z-overlay self-end col-3 square"
            style={{ marginBottom: `-${position}vh` }}
            alt={`${data.title} illustration`}
            src={get(data, 'image.fields.file.url', '')}
          />
          <div className="flex flex-column justify-center my4 col-4">
            <h2 className="block-headline mb3">{data.title}</h2>
            <p>{data.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageText;

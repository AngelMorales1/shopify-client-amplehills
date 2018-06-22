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
        className={cx(
          'p4 drip',
          styles[colorClass],
          styles['Imagetext__container']
        )}
      >
        <div className="flex justify-around m4 px4">
          <Image
            className={cx('z-overlay self-end', styles['ImageText__image'])}
            style={{ marginBottom: `-${position}vh` }}
            alt={`${data.title} illustration`}
            src={get(data, 'image.fields.file.url', '')}
          />
          <div
            className={cx(
              'flex flex-column justify-center my4',
              styles['ImageText__text-box']
            )}
          >
            <h2 className="block-headline mb3">{data.title}</h2>
            <p>{data.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageText;

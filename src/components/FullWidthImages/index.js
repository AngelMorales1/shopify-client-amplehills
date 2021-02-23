import React from 'react';
import get from 'lodash/get';
import cx from 'classnames';

import contentfulImgUtil from 'utils/contentfulImgUtil';
import { Image } from 'components/base';
import styles from './FullWidthImages.scss';

const FullWidthImages = ({ block, z, blockRef }) => {
  const fields = get(block, 'fields');
  const desktopImages = get(fields, 'desktopImages', []);
  const mobileImages = get(fields, 'mobileImages', []);

  return (
    <div ref={blockRef} className={cx(styles['FullWidthImages'], 'w100')}>
      <div className={styles['FullWidthImages__desktop']}>
        {desktopImages &&
          desktopImages.map(image => (
            <Image
              src={contentfulImgUtil(
                get(image, 'fields.file.url', ''),
                '1800',
                'png'
              )}
            />
          ))}
      </div>
      <div className={styles['FullWidthImages__mobile']}>
        {mobileImages &&
          mobileImages.map(image => (
            <Image
              src={contentfulImgUtil(
                get(image, 'fields.file.url', ''),
                '1000',
                'png'
              )}
            />
          ))}
      </div>
    </div>
  );
};

export default FullWidthImages;

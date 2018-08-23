import React from 'react';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';

import styles from './CenterImageText.scss';
import { Image } from 'components/base';

const CenterImageText = ({ block, z }) => {
  const fields = get(block, 'fields', {});
  const title = get(fields, 'title', '');
  const image = get(fields, 'image', null);
  const isDripOn = get(fields, 'drip', false);
  const colorClass = `CenterImageText--${get(fields, 'color', 'blue')}`;
  const classes = cx(
    styles[colorClass],
    {
      drip: isDripOn
    },
    'pb2 z-sub-nav'
  );

  return (
    <div style={{ zIndex: z }} className={classes}>
      <div className="transition-slide-up container-width mx-auto pt4 px2 center">
        <p className="block-headline pt3 pb4">{title}</p>
        {image ? (
          <Image
            className="col-8 md-col-6 mt4"
            alt={`${title} image`}
            src={contentfulImgUtil(
              get(image, 'fields.file.url', ''),
              '1400',
              'png'
            )}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CenterImageText;

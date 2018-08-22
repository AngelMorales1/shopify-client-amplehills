import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';

import imageModel from 'models/imageModel';
import styles from './GenericHero.scss';
import { Image, Button } from 'components/base';

const GenericHero = ({ block, z }) => {
  const fields = get(block, 'fields', {});
  const title = get(fields, 'title', '');
  const image1 = get(fields, 'image1', null);
  const isDripOn = get(fields, 'drip', false);
  const colorClass = `GenericHero--${get(fields, 'color', 'blue')}`;
  const text = get(fields, 'text', '');
  const imageRight = get(fields, 'imageRight', false);
  const isReverseArrangement = get(fields, 'isReverseArrangement', false);
  const buttonLabel = get(fields, 'buttonLabel', '');
  const buttonLink = get(fields, 'buttonLink', '');
  const blockHasButton = !!buttonLabel && !!buttonLink;
  const classes = cx(
    styles[colorClass],
    {
      pb4: !isDripOn,
      drip: isDripOn
    },
    'pb2 z-sub-nav'
  );

  return (
    <div style={{ zIndex: z }} className={classes}>
      <div className="transition-slide-up container-width mx-auto pt4 px2 center">
        <p className="block-headline pt3 pb4">{title}</p>
        {image1 ? (
          <Image
            className="col-8 md-col-6 mt4"
            alt={`${title} image`}
            src={contentfulImgUtil(
              get(image1, 'fields.file.url', ''),
              '1400',
              'png'
            )}
          />
        ) : null}
      </div>
    </div>
  );
};

GenericHero.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      color: PropTypes.string,
      drip: PropTypes.bool,
      image1: imageModel.propTypes,
      title: PropTypes.string,
      text: PropTypes.string,
      buttonLink: PropTypes.string,
      buttonLabel: PropTypes.string
    })
  })
};

GenericHero.defaultProps = {
  z: 1,
  block: {
    fields: PropTypes.shape({
      color: 'blue',
      drip: false,
      image1: null,
      title: '',
      text: '',
      buttonLink: '',
      buttonLabel: ''
    })
  }
};

export default GenericHero;

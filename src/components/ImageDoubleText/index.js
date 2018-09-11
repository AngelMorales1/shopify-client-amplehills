import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import imageModel from 'models/imageModel';

import styles from './ImageDoubleText.scss';

const ImageDoubleText = ({ block, z, setRef }) => {
  const fields = get(block, 'fields', {});
  const colorClass = `ImageDoubleText--${get(
    fields,
    'backgroundColor',
    'light-yellow'
  )}`;
  const isReverseArrangement = get(fields, 'isReverseArrangement', false);

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(
        styles['ImageDoubleText'],
        styles[colorClass],
        'drip drip-padding-on-children'
      )}
    >
      <div className="wh100 flex justify-center items-center overflow-hidden">
        <div
          className={cx(
            styles['ImageDoubleText--container'],
            {
              [styles[
                'ImageDoubleText--container--reverse'
              ]]: isReverseArrangement
            },
            'container-width flex items-center justify-between'
          )}
        >
          <div
            className={cx(
              styles['ImageDoubleText--image-container'],
              'circle square'
            )}
            style={{
              background: `url(${contentfulImgUtil(
                get(fields, 'image.fields.file.url', ''),
                '1400'
              )}) no-repeat center`,
              backgroundSize: 'cover'
            }}
          />
          <div
            className={cx(
              styles['ImageDoubleText--text-container'],
              'md-col-6'
            )}
          >
            <div className="mb3">
              <h2 className="block-headline mb2">
                {get(fields, 'title1', '')}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(get(fields, 'text1', ''))
                }}
                className="markdown-block"
              />
            </div>
            <div>
              <h2 className="block-headline mb2">
                {get(fields, 'title2', '')}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(get(fields, 'text2', ''))
                }}
                className="markdown-block"
              />
            </div>
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
      image: imageModel.propTypes,
      isReverseArrangement: PropTypes.bool
    })
  }),
  setRef: PropTypes.func
};

ImageDoubleText.defaultProps = {
  z: 1,
  block: {
    fields: {
      backgroundColor: 'light-yellow',
      text1: '',
      text2: '',
      title1: '',
      title2: '',
      image: imageModel.default,
      isReverseArrangement: false
    }
  },
  setRef: () => {}
};

export default ImageDoubleText;

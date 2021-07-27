import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import portableTextAsString from 'utils/portableTextAsString';
import imageModel from 'models/imageModel';

import styles from './ImageDoubleText.scss';
import { Button, PortableText } from 'components/base';

const ImageDoubleText = ({ block, z, setRef }) => {
  const colorClass = `ImageDoubleText--${get(
    block,
    'backgroundColor',
    'white'
  )}`;
  const reverseArrangementX = get(block, 'reverseX', false);
  const reverseArrangementY = get(block, 'reverseY', false);
  const smallTitle = get(block, 'subtitle', '');
  const smallTitleColor = get(block, 'subtitleColor', 'madison-blue');
  const title = get(block, 'title', '');
  const title1 = get(block, 'title1', '');
  const text1 = get(block, 'text1', '');
  const smallTitle2 = get(block, 'subtitle2', '');
  const smallTitle2Color = get(block, 'subtitle2Color', 'madison-blue');
  const title2 = get(block, 'title2', '');
  const text2 = get(block, 'text2', '');
  const buttonLabel = get(block, 'buttonLabel', '');
  const buttonLink = get(block, 'buttonLink', '');
  const dripIsOn = get(block, 'drip', false);
  const upperDripIsOn = get(block, 'upperDrip', false);
  const image = get(block, 'image.src', '');

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(
        styles['ImageDoubleText'],
        styles[colorClass],
        'drip-padding-on-children',
        { drip: dripIsOn, 'upper-drip': upperDripIsOn }
      )}
    >
      <div className="wh100 flex justify-center items-center overflow-hidden">
        <div
          className={cx(
            styles['ImageDoubleText--container'],
            {
              [styles[
                'ImageDoubleText--container--reverse-x'
              ]]: reverseArrangementX,
              [styles[
                'ImageDoubleText--container--reverse-y'
              ]]: reverseArrangementY,
              [styles['ImageDoubleText--container--reverse-xy']]:
                reverseArrangementY && reverseArrangementX
            },
            'w100 container-width flex items-center justify-between'
          )}
        >
          <div
            className={cx(
              styles['ImageDoubleText--image-container'],
              'circle square'
            )}
            style={{
              background: `url(${image}?w=1200) no-repeat center`,
              backgroundSize: 'cover'
            }}
          />
          <div
            className={cx(
              styles['ImageDoubleText--text-container'],
              'col-12 md-col-7 flex flex-column'
            )}
          >
            {smallTitle ? (
              <p className={`text-${smallTitleColor} small-title mb2`}>
                {smallTitle}
              </p>
            ) : null}
            {title && !title1 && !text1 && !title2 && !text2 ? (
              <h2
                className={cx(styles['ImageDoubleText__title'], 'carter mb2')}
              >
                {title}
              </h2>
            ) : null}
            {title1 || text1 ? (
              <div
                className={cx({
                  mb4:
                    title2 || (text2 && !!portableTextAsString(text2).length),
                  mb3:
                    !title2 && !(text2 && !!portableTextAsString(text2).length)
                })}
              >
                <h2 className="block-headline mb3">{title1}</h2>
                <div className="portable-text">
                  <PortableText blocks={text1} />
                </div>
              </div>
            ) : null}
            {smallTitle2 ? (
              <p className={`text-${smallTitle2Color} small-title mb2`}>
                {smallTitle2}
              </p>
            ) : null}
            {title2 || (text2 && !!portableTextAsString(text2).length) ? (
              <div className="mb3">
                <h2 className="block-headline mb2">{title2}</h2>
                <div className="portable-text">
                  <PortableText blocks={text2} />
                </div>
              </div>
            ) : null}
            {buttonLabel ? (
              <Button
                variant="primary-responsive"
                className="inline-flex"
                color="peach"
                label={buttonLabel}
                to={buttonLink}
              />
            ) : null}
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
      image: imageModel.propTypes,
      backgroundColor: PropTypes.string,
      reverseArrangementX: PropTypes.bool,
      reverseArrangementY: PropTypes.bool,
      smallTitle: PropTypes.string,
      smallTitleColor: PropTypes.string,
      title: PropTypes.string,
      title1: PropTypes.string,
      text1: PropTypes.string,
      title2: PropTypes.string,
      text2: PropTypes.string,
      buttonLabel: PropTypes.string,
      buttonLink: PropTypes.string,
      drip: PropTypes.bool
    })
  }),
  setRef: PropTypes.func
};

ImageDoubleText.defaultProps = {
  z: 1,
  block: {
    fields: {
      image: imageModel.default,
      backgroundColor: 'white',
      reverseArrangementX: false,
      reverseArrangementY: false,
      smallTitle: '',
      smallTitleColor: 'madison-blue',
      title: '',
      title1: '',
      text1: '',
      title2: '',
      text2: '',
      buttonLabel: '',
      buttonLink: '',
      drip: false
    }
  },
  setRef: () => {}
};

export default ImageDoubleText;

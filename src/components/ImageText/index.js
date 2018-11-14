import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import imageModel from 'models/imageModel';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import styles from './ImageText.scss';
import { Image, Button } from 'components/base';

const ImageText = ({ block, z, setRef }) => {
  const fields = get(block, 'fields', {});
  const colorClass = `ImageText--${get(fields, 'backgroundColor', 'white')}`;
  const positionY = get(fields, 'imagePositionY', 0);
  const positionX = get(fields, 'imagePositionX', 0);
  const isReverseArrangement = get(fields, 'isReverseArrangement', false);
  const isDripOn = get(fields, 'drip', false);
  const isUpperDripOn = get(fields, 'upperDrip', false);
  const isFullImage = get(fields, 'fullImage', false);
  const imageTextRatio = get(fields, 'imageTextRatio', '40:60');
  const imageTextRatioIs5050 = imageTextRatio === '50:50';
  const buttonLabel = get(fields, 'buttonLabel', '');
  const buttonLink = get(fields, 'buttonLink', '');
  const blockHasButton = buttonLabel && buttonLink;
  const buttonColor = get(fields, 'buttonColor', 'peach');
  const linkedTextDescription = get(fields, 'linkedTextDescription', '');
  const linkedTextLabel = get(fields, 'linkedTextLabel', '');
  const linkedTextLink = get(fields, 'linkedTextLink', '');
  const textContentCenterAlign = get(fields, 'textContentCenterAlign', '');
  const smallTitle = get(fields, 'smallTitle', '');
  const smallTitleColor = get(fields, 'smallTitleColor', 'madison-blue');
  const blockHasLinkedText = linkedTextLabel && linkedTextLink;

  const getButtonColor = colorName => {
    switch (colorName) {
      case 'navy':
        return 'madison-blue';
      default:
        return 'peach';
    }
  };

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(
        styles['ImageText'],
        styles[colorClass],
        {
          drip: isDripOn,
          'upper-drip': isUpperDripOn,
          'drip-padding-on-children': isFullImage,
          [styles['ImageText__full-image']]: isFullImage,
          [styles['ImageText__full-image--reverse']]:
            isFullImage && isReverseArrangement
        },
        'flex justify-center'
      )}
    >
      <div
        className={cx(
          'flex container-width py4',
          styles['ImageText__container'],
          { [styles['ImageText__container--full-image']]: isFullImage },
          {
            [styles['ImageText__container--full-image']]: isFullImage,
            [styles['ImageText__container--reverse']]: isReverseArrangement,
            'col-12 md-col6': isFullImage
          }
        )}
      >
        <div
          className={cx(
            'flex flex-column justify-center col-12',
            styles['ImageText__text-content'],
            {
              [styles[
                'ImageText__text-content--reverse'
              ]]: isReverseArrangement,
              [styles[
                'ImageText__text-content--center'
              ]]: textContentCenterAlign,
              'md-col-5': imageTextRatioIs5050 && !isFullImage,
              'md-col-6': !imageTextRatioIs5050 && !isFullImage,
              'md-col-9': isFullImage
            }
          )}
        >
          {smallTitle ? (
            <p className={`small-title mb3 text-${smallTitleColor}`}>
              {smallTitle}
            </p>
          ) : null}
          <h2 className="block-headline mb3">{get(fields, 'title', '')}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: marked(get(fields, 'text', ''))
            }}
            className="markdown-block"
          />
          <div
            className={cx(
              styles['ImageText__button-container'],
              'flex flex-row flex-wrap items-center'
            )}
          >
            {blockHasButton ? (
              <Button
                className={cx(styles['ImageText__button'], 'my1 mr2')}
                label={buttonLabel}
                to={buttonLink}
                color={getButtonColor(buttonColor)}
              />
            ) : null}
            {blockHasLinkedText && !linkedTextDescription ? (
              <Button
                className="my1 mr1 text-madison-blue"
                label={linkedTextLabel}
                to={linkedTextLink}
                variant="underline-peach"
              />
            ) : null}
          </div>
          {blockHasLinkedText && linkedTextDescription ? (
            <div
              className={cx(
                styles['ImageText__linked-text-description-container'],
                'w100 flex mt4'
              )}
            >
              <p
                className={cx(
                  styles['ImageText__linked-text-description'],
                  'carter mr1'
                )}
              >
                {linkedTextDescription}
              </p>
              <div className="inline-flex">
                <Button
                  className="text-madison-blue"
                  label={linkedTextLabel}
                  to={linkedTextLink}
                  variant="underline-peach"
                />
              </div>
            </div>
          ) : null}
        </div>
        {!isFullImage ? (
          <Image
            className={cx(
              styles['ImageText__image'],
              {
                'col-6': imageTextRatioIs5050 && !isFullImage,
                'col-4': !imageTextRatioIs5050 && !isFullImage
              },
              'z-sub-nav mt2 mx-auto my-auto'
            )}
            style={{
              transform: `translate(${positionX}%, ${positionY}%)`
            }}
            alt={`${get(fields, 'title', '')} illustration`}
            src={contentfulImgUtil(
              get(fields, 'image.fields.file.url', ''),
              '1400',
              'png'
            )}
          />
        ) : null}
      </div>
      {isFullImage ? (
        <div
          className="w100 square col-12 md-col-6"
          style={{
            background: `url(${contentfulImgUtil(
              get(fields, 'image.fields.file.url', ''),
              '1600',
              'png'
            )}) no-repeat center`,
            backgroundSize: 'cover'
          }}
        />
      ) : null}
    </div>
  );
};

ImageText.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      backgroundColor: PropTypes.string,
      image: imageModel.propTypes,
      imagePositionY: PropTypes.number,
      imagePositionX: PropTypes.number,
      text: PropTypes.string,
      title: PropTypes.string,
      isReverseArrangement: PropTypes.bool,
      imageTextRatio: PropTypes.string,
      drip: PropTypes.bool,
      fullImage: PropTypes.bool,
      buttonLabel: PropTypes.string,
      buttonLink: PropTypes.string,
      buttonColor: PropTypes.string,
      linkedTextLabel: PropTypes.string,
      linkedTextLink: PropTypes.string,
      smallTitle: PropTypes.string,
      smallTitleColor: PropTypes.string
    })
  }),
  setRef: PropTypes.func
};

ImageText.defaultProps = {
  z: 1,
  block: {
    fields: {
      backgroundColor: 'pink',
      image: imageModel.default,
      imagePositionY: 0,
      imagePositionX: 0,
      text: '',
      title: '',
      isReverseArrangement: false,
      imageTextRatio: '50:50',
      drip: false,
      fullImage: false,
      buttonLabel: '',
      buttonLink: '',
      linkedTextLabel: '',
      linkedTextLink: '',
      smallTitle: '',
      smallTitleColor: 'madison-blue'
    }
  },
  setRef: () => {}
};

export default ImageText;

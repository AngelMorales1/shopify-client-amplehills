import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import imageModel from 'models/imageModel';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import LocationSearch from 'components/LocationSearch';

import styles from './ImageText.scss';
import { Image, Button, PortableText } from 'components/base';

const ImageText = ({ block, z, setRef }) => {
  const title = get(block, 'title', '');
  const subtitle = get(block, 'subtitle', '');
  const text = get(block, 'text', '');
  const colorClass = `ImageText--${get(block, 'backgroundColor', 'white')}`;
  const positionY = get(block, 'imagePositionY', 0);
  const positionX = get(block, 'imagePositionX', 0);
  const isReverseArrangement = get(block, 'reverse', false);
  const dripIsOn = get(block, 'drip', false);
  const upperDripIsOn = get(block, 'upperDrip', false);
  const isFullImage = get(block, 'fullImage', true);
  const imageTextRatioIs5050 = get(block, 'is5050', true);
  const buttonLabel = get(block, 'buttonLabel', '');
  const buttonLink = get(block, 'buttonLink', '');
  const blockHasButton = buttonLabel && buttonLink;
  const buttonColor = get(block, 'buttonColor', 'peach');
  const linkedTextDescription = get(block, 'linkedTextDescription', '');
  const linkedTextLabel = get(block, 'linkedTextLabel', '');
  const linkedTextLink = get(block, 'linkedTextLink', '');
  const textContentCenterAlign = get(block, 'centerAlignTextContent', false);
  const smallTitle = subtitle;
  const smallTitleColor = get(block, 'smallTitleColor', 'madison-blue');
  const blockHasLinkedText = linkedTextLabel && linkedTextLink;
  const imageUrl = `${get(block, 'image.src', '')}?w=1200&q=90`;
  const showLocationSearchBar = get(block, 'showLocationSearchBar', false);

  const getButtonColor = colorName => {
    switch (colorName) {
      case 'blue':
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
          drip: dripIsOn,
          'upper-drip': upperDripIsOn,
          'drip-padding-on-children': isFullImage,
          [styles['ImageText__full-image']]: isFullImage,
          [styles['ImageText__full-image--reverse']]:
            isFullImage && isReverseArrangement
        },
        'flex justify-center relative'
      )}
    >
      <div
        className={cx('flex container-width', styles['ImageText__container'], {
          [styles['ImageText__container--full-image']]: isFullImage,
          [styles['ImageText__container--reverse']]: isReverseArrangement,
          'col-12': isFullImage
        })}
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
              [styles[
                'ImageText__text-content--with-location-search'
              ]]: showLocationSearchBar,
              'md-col-5': imageTextRatioIs5050 && !isFullImage,
              'md-col-6': !imageTextRatioIs5050 && !isFullImage,
              'md-col-9': isFullImage
            }
          )}
        >
          <div className="mb3 relative inline-block z-1">
            {smallTitle ? (
              <p
                className={cx(`small-title mb3 text-${smallTitleColor}`, {
                  [styles['ImageText__content--center']]: textContentCenterAlign
                })}
              >
                {smallTitle}
              </p>
            ) : null}
            <h1
              className={cx('block-headline', {
                [styles['ImageText__content--center']]: textContentCenterAlign
              })}
            >
              {title}
            </h1>
            {/* <Image
              style={{
                transform: `translateX(${get(
                  block,
                  'titleBackgroundImagePosition',
                  0
                )}%)`
              }}
              className={cx(
                'absolute z-below t0 b0 my-auto',
                styles['ImageText__title-illustration']
              )}
              src={contentfulImgUtil(
                get(block, 'titleBackgroundImage.fields.file.url', ''),
                '1000',
                'png'
              )}
            /> */}
          </div>
          <div
            className={cx('portable-text z-1', {
              [styles['ImageText__content--center']]: textContentCenterAlign
            })}
          >
            <PortableText blocks={text} />
          </div>
          <div
            className={cx(
              styles['ImageText__button-container'],
              'flex flex-row flex-wrap items-center',
              {
                [styles['ImageText__content--center']]: textContentCenterAlign
              }
            )}
          >
            {blockHasButton ? (
              <Button
                className={cx(
                  styles['ImageText__button'],
                  'my1 mr2 inline-flex'
                )}
                variant="primary-responsive"
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
                  'carter mr2 pb1'
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
            alt={`${get(block, 'title', '')} illustration`}
            src={imageUrl}
          />
        ) : null}
      </div>
      {isFullImage ? (
        <div
          className={cx(
            styles['ImageText__full-image-container'],
            'w100 col-12 md-col-6 flex'
          )}
        >
          <div
            className="wh100 square"
            style={{
              background: `url(${imageUrl}) no-repeat center`,
              backgroundSize: 'cover'
            }}
          />
        </div>
      ) : null}

      {showLocationSearchBar ? <LocationSearch /> : null}
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

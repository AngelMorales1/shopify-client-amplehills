import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import styles from './MultipleImageText.scss';
import { Image } from 'components/base';
const MultipleImageText = ({ block, setRef, z }) => {
  const imagesAndTexts = get(block, 'fields.fragmentType.simpleFragments', {});
  const drip = get(block, 'fields.drip', false);
  return (
    <div
      style={{ zIndex: z }}
      ref={refBlock => setRef(refBlock)}
      className={cx('py4 px3', {
        drip: drip
      })}
    >
      <div className="form-container-width flex flex-column mx-auto">
        {Object.values(imagesAndTexts).map(imageAndText => (
          <div
            key={get(imageAndText, 'uuid', '')}
            className={cx(
              styles['MultipleImageText__image-text-container'],
              'flex justify-between items-center my2'
            )}
          >
            <div className={cx(styles['MultipleImageText__image'], 'm2')}>
              <Image
                className="w100"
                src={get(imageAndText, 'image.data', '')}
              />
            </div>
            <div className="text-container-width w100">
              <p className={cx(styles['MultipleImageText__text'])}>
                {get(imageAndText, 'text', '')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
MultipleImageText.propTypes = {
  setRef: PropTypes.func,
  z: PropTypes.number,
  drip: PropTypes.bool,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      contentType: PropTypes.string,
      MultipleImageText: PropTypes.shape({
        simpleFragments: PropTypes.object
      })
    })
  })
};
MultipleImageText.defaultProps = {
  setRef: () => {},
  z: 1,
  drip: false,
  block: {
    fields: {
      contentType: '',
      MultipleImageText: {
        simpleFragments: {}
      }
    }
  }
};
export default MultipleImageText;

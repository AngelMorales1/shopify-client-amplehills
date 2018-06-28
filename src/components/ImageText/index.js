import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import imageModel from 'models/imageModel';

import styles from './ImageText.scss';
import { Image } from 'components/base';

<<<<<<< HEAD
const ImageText = ({ block, z }) => {
  const fields = get(block, 'fields', {});
  const colorClass = `ImageText--${get(fields, 'backgroundColor', 'Pink')}`;
  const position = get(fields, 'imagePosition', 0);

  return (
    <div
      style={{ zIndex: z }}
      className={cx('p4 flex drip', styles['ImageText'], styles[colorClass])}
    >
      <div className="flex justify-around px4">
        <Image
          className="z-overlay self-end col-3 square"
          style={{ transform: `translateY(${position}%)` }}
          alt={`${get(fields, 'title', '')} illustration`}
          src={get(fields, 'image.fields.file.url', '')}
        />
        <div className="flex flex-column justify-center my4 col-4">
          <h2 className="block-headline mb3">{get(fields, 'title', '')}</h2>
          <p className="description">{get(fields, 'text', '')}</p>
=======
class ImageText extends Component {
  render() {
    const { block } = this.props;
    const fields = get(block, 'fields', {});
    const colorClass = `ImageText--${get(fields, 'backgroundColor', 'Pink')}`;
    const position = get(fields, 'imagePosition', 0);
    return (
      <div className={cx('flex drip', styles['ImageText'], styles[colorClass])}>
        <div className={cx(styles['ImageText__container'])}>
          <Image
            className={cx(styles['ImageText__image'], 'z-overlay col-4')}
            style={{ transform: `translateY(${position}%)` }}
            alt={`${get(fields, 'title', '')} illustration`}
            src={get(fields, 'image.fields.file.url', '')}
          />
          <div
            className={cx(
              styles['ImageText__text-content'],
              'flex flex-column justify-center'
            )}
          >
            <h2 className="block-headline mb3">{get(fields, 'title', '')}</h2>
            <p className="description">{get(fields, 'text', '')}</p>
          </div>
>>>>>>> mobile style
        </div>
      </div>
    </div>
  );
};

export default ImageText;

ImageText.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      backgroundColor: PropTypes.string,
      image: imageModel.propTypes,
      imagePosition: PropTypes.number,
      text: PropTypes.string,
      title: PropTypes.string
    })
  })
};

ImageText.defaultProps = {
  z: 1,
  block: {
    fields: {
      backgroundColor: 'Pink',
      image: imageModel.default,
      imagePosition: 0,
      text: '',
      title: ''
    }
  }
};

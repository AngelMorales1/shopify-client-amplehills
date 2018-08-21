import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';

import { Image, Button } from 'components/base';
import styles from './PressGrid.scss';
import imageModel from 'models/imageModel';

const PressGrid = ({ pressBlock }) => {
  const fields = get(pressBlock, 'fields', {});

  return (
    <div
      className={cx(
        styles['PressGrid'],
        'm2 pt4 pb3 px3 flex flex-column justify-center items-center'
      )}
    >
      <Image
        className={cx(styles['PressGrid__logo'])}
        src={fields.image.fields.file.url}
        alt={`${fields.title} logo`}
      />
      <span
        className={cx(
          styles['PressGrid__quote'],
          'carter text-peach center py3 mb4'
        )}
      >{`"${fields.quote}"`}</span>
      <Button
        className={cx(styles['PressGrid__button'], 'uppercase')}
        to={fields.linkUrl}
        label="Read about it"
        variant="primary-small"
        color="peach"
      />
    </div>
  );
};

export default PressGrid;

PressGrid.propTypes = {
  pressBlock: PropTypes.shape({
    fields: PropTypes.shape({
      image: imageModel.propTypes,
      linkUrl: PropTypes.string,
      quote: PropTypes.string,
      title: PropTypes.string
    })
  })
};

PressGrid.defaultProps = {
  pressBlock: {
    fields: {
      image: imageModel.default,
      linkUrl: '',
      quote: '',
      title: ''
    }
  }
};

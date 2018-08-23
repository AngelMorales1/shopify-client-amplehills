import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';

import { Image, Button } from 'components/base';
import styles from './PressCard.scss';
import imageModel from 'models/imageModel';

const PressCard = ({ pressCard }) => {
  const fields = get(pressCard, 'fields', {});

  return (
    <div
      className={cx(
        styles['PressCard'],
        'm2 pt4 pb3 px3 flex flex-column justify-center items-center'
      )}
    >
      <Image
        className={cx(styles['PressCard__logo'])}
        src={fields.logoImage.fields.file.url}
        alt={`${fields.title} logo`}
      />
      <span
        className={cx(
          styles['PressCard__quote'],
          'carter text-peach center py3 mb4'
        )}
      >{`"${fields.quote}"`}</span>
      <Button
        className={cx(styles['PressCard__button'], 'uppercase')}
        to={fields.linkUrl}
        label="Read about it"
        variant="primary-small"
        color="peach"
      />
    </div>
  );
};

PressCard.propTypes = {
  pressCard: PropTypes.shape({
    fields: PropTypes.shape({
      logoImage: imageModel.propTypes,
      linkUrl: PropTypes.string,
      quote: PropTypes.string,
      title: PropTypes.string
    })
  })
};

PressCard.defaultProps = {
  pressCard: {
    fields: {
      logoImage: imageModel.default,
      linkUrl: '',
      quote: '',
      title: ''
    }
  }
};

export default PressCard;

import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';

import { Image, Button } from 'components/base';
import styles from './PressCard.scss';

const PressCard = ({ pressCard }) => {
  return (
    <div
      className={cx(
        styles['PressCard'],
        'm2 pt4 pb3 px3 flex flex-column justify-between items-center'
      )}
    >
      <Image
        className={cx(styles['PressCard__logo'])}
        src={`${pressCard.logo.src}?w=300`}
        alt={`${pressCard.publication} logo`}
      />
      <span
        className={cx(
          styles['PressCard__quote'],
          'carter text-peach center py3 mb2'
        )}
      >
        {pressCard.quote}
      </span>
      <Button
        className={cx(styles['PressCard__button'], 'uppercase')}
        to={pressCard.link}
        label="Read about it"
        variant="primary-small"
        color="peach"
      />
    </div>
  );
};

PressCard.propTypes = {
  pressCard: PropTypes.shape({
    logoImage: PropTypes.shape({
      data: PropTypes.string
    }),
    linkUrl: PropTypes.string,
    quote: PropTypes.string,
    title: PropTypes.string
  })
};

PressCard.defaultProps = {
  pressCard: {
    logoImage: {
      data: ''
    },
    linkUrl: '',
    quote: '',
    title: ''
  }
};

export default PressCard;

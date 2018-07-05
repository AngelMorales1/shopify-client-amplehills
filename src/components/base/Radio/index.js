import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Radio.scss';

import { Image, Button } from 'components/base';

const Radio = ({ variant, color, className, label, checked, onClick }) => {
  const checkImage = color => {
    switch (color) {
      case 'white':
        return '/assets/images/icon-check-peach.svg';
      default:
        return '/assets/images/icon-check.svg';
    }
  };

  return (
    <Button
      variant="style-none"
      onClick={onClick}
      className={cx(
        styles['Radio'],
        styles[`Radio--${color}`],
        styles[`Radio--${variant}`],
        'relative flex bold',
        className
      )}
    >
      {checked ? (
        <Image
          className={cx('absolute', styles['Radio__check'])}
          alt="Check icon"
          src={checkImage(color)}
        />
      ) : null}
      <label>{label}</label>
    </Button>
  );
};

Radio.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  variant: PropTypes.string
};

Radio.defaultProps = {
  className: '',
  label: '',
  checked: false,
  variant: 'primary'
};

export default Radio;

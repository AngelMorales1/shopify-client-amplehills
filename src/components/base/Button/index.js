import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Button.scss';

const Button = ({
  className,
  label,
  variant,
  color,
  disabled,
  onClick,
  minWidth,
  fullWidth,
  type
}) => {
  const classes = cx(
    className,
    styles.Button,
    styles[`Button--${variant}`],
    styles[`Button--${color}`],
    {
      w100: fullWidth,
      [styles['Button--disabled']]: disabled
    }
  );

  return (
    <button type={type} onClick={onClick} className={classes}>
      {label}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string
};

Button.defaultProps = {
  className: '',
  label: '',
  variant: 'primary',
  color: 'white-denim',
  onClick: () => {},
  fullWidth: false,
  disabled: false,
  type: 'button'
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import isExternalLink from 'utils/isExternalLink';

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
  type,
  to
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

  const linkedComponent = isExternalLink(to) ? (
    <a
      className="text-decoration-none"
      href={to}
      target="_blank"
      rel="noopener"
      onClick={onClick}
    >
      <div className={classes}>{label}</div>
    </a>
  ) : (
    <Link className="text-decoration-none" to={to} onClick={onClick}>
      <div className={classes}>{label}</div>
    </Link>
  );

  const button = to ? (
    linkedComponent
  ) : (
    <button type={type} onClick={onClick} className={classes}>
      {label}
    </button>
  );

  return button;
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  to: PropTypes.string
};

Button.defaultProps = {
  className: '',
  label: '',
  variant: 'primary',
  color: 'white-denim',
  onClick: () => {},
  fullWidth: false,
  disabled: false,
  type: 'button',
  to: ''
};

export default Button;

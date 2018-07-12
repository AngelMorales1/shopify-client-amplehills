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
  children,
  disabled,
  onClick,
  minWidth,
  fullWidth,
  type,
  to
}) => {
  const classes = cx(
    className,
    'flex flex-column justify-center items-center',
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
      className={cx('text-decoration-none', {
        'events-none': disabled
      })}
      href={to}
      target="_blank"
      rel="noopener"
      onClick={onClick}
    >
      <div className={classes}>{label}</div>
    </a>
  ) : (
    <Link
      className={cx('text-decoration-none', {
        'events-none': disabled
      })}
      to={to}
      onClick={onClick}
    >
      <div className={classes}>{label}</div>
    </Link>
  );

  const button = to ? (
    linkedComponent
  ) : (
    <button type={type} onClick={onClick} className={classes}>
      <div>{children && !label ? children : label}</div>
    </button>
  );

  return button;
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  to: PropTypes.string
};

Button.defaultProps = {
  className: '',
  children: null,
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

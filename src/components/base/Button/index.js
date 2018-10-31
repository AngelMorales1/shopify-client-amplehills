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
  to,
  shadow,
  hover,
  newTab,
  onMouseEnter,
  onMouseLeave
}) => {
  const classes = cx(
    styles[`Button--${color}`],
    {
      w100: fullWidth,
      [styles['Button--disabled']]: disabled,
      [styles['Button--div']]: to,
      [styles['Button--shadow']]: shadow,
      [styles['Button--border-none']]: children && !label
    },
    styles[`Button--${variant}`],
    styles[`Button--hover-${hover}`],
    className,
    styles.Button
  );

  const linkedComponent =
    isExternalLink(to) || newTab ? (
      <a
        className={cx('text-decoration-none', {
          'events-none': disabled
        })}
        href={to}
        target="_blank"
        rel="noopener"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={classes}>
          <span className="avenir h100 flex justify-center items-center">
            {label}
          </span>
        </div>
      </a>
    ) : (
      <Link
        className={cx('text-decoration-none', {
          'events-none': disabled
        })}
        to={to}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={classes}>
        {children && !label ? (
          children
        ) : (
          <span className="h100 flex justify-center items-center">{label}</span>
        )}
      </div>
      </Link>
    );

  const button = to ? (
    linkedComponent
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="h100 flex justify-center items-center">
        {children && !label ? children : label}
      </div>
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
  to: PropTypes.string,
  shadow: PropTypes.bool,
  hover: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
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
  to: '',
  shadow: false,
  hover: 'shadow',
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

export default Button;

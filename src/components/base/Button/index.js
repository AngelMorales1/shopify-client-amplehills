import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import isExternalLink from 'utils/isExternalLink';

import styles from './Button.scss';

class Button extends PureComponent {
  render() {
    const {
      className,
      label,
      variant,
      color,
      children,
      disabled,
      onClick,
      fullWidth,
      type,
      to,
      title,
      shadow,
      hover,
      newTab,
      onMouseEnter,
      onMouseLeave,
      childrenWrapperClassName,
      openInCurrentTab,
      ariaLabel
    } = this.props;

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

    if (to) {
      const linkedComponent =
        isExternalLink(to) || newTab ? (
          <a
            className={cx('text-decoration-none', {
              'events-none': disabled
            })}
            target={openInCurrentTab ? '_self' : '_blank'}
            href={to}
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
            aria-label={ariaLabel || label}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className={classes}>
              {children && !label ? (
                children
              ) : (
                <span className="h100 flex justify-center items-center">
                  {label}
                </span>
              )}
            </div>
          </Link>
        );

      return linkedComponent;
    }

    return (
      <button
        aria-label={ariaLabel || label}
        type={type}
        onClick={onClick}
        className={classes}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        title={title}
      >
        <div
          className={cx(
            'h100 flex justify-center items-center',
            childrenWrapperClassName
          )}
        >
          {children && !label ? children : label}
        </div>
      </button>
    );
  }
}

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
  onMouseLeave: PropTypes.func,
  childrenWrapperClassName: PropTypes.string,
  openInCurrentTab: PropTypes.bool,
  ariaLabel: PropTypes.string
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
  onMouseLeave: () => {},
  childrenWrapperClassName: '',
  openInCurrentTab: false,
  ariaLabel: ''
};

export default Button;

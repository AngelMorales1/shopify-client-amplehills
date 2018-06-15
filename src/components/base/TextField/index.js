import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './TextField.scss';

const TextField = ({
  id,
  className,
  label,
  name,
  error,
  onBlur,
  onChange,
  pattern,
  placeholder,
  type,
  required,
  value,
  variant,
  color,
  fullWidth
}) => {
  const classes = cx(styles['TextField'], 'field-group', className, {
    [styles['TextField--error']]: error,
    w100: fullWidth
  });

  const _id = id || name;

  return (
    <div
      className={`${classes} ${styles[`TextField--${variant}`]} ${
        styles[`TextField--${color}`]
      }`}
    >
      <label htmlFor={_id} className="label-text caps mb1">
        {label}
      </label>
      <input
        id={_id}
        name={name}
        onBlur={e => onBlur(e.target.value)}
        onChange={e => onChange(e.target.value)}
        pattern={pattern}
        placeholder={placeholder}
        type={type}
        required={required ? 'required' : false}
        value={value}
      />
    </div>
  );
};

TextField.propTypes = {
  id: PropTypes.string,
  address: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  pattern: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(RegExp)
  ]),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

TextField.defaultProps = {
  address: '',
  className: '',
  onBlur: () => {},
  onChange: () => {},
  placeholder: '',
  required: false,
  type: 'text',
  name: ''
};

export default TextField;

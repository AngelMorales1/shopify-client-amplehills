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
  fullWidth,
  min,
  max
}) => {
  const classes = cx(styles['TextField'], 'field-group', className, {
    [styles['TextField--error']]: error,
    w100: fullWidth
  });

  const _id = id || name;

  return (
    <div
      className={cx(
        classes,
        styles[`TextField--${variant}`],
        styles[`TextField--${color}`],
        {
          [styles[`TextField--textarea`]]: type === 'textarea'
        }
      )}
    >
      {label ? (
        <label htmlFor={_id} className="small bold mb1">
          {label}
        </label>
      ) : null}
      {type === 'textarea' ? (
        <textarea
          id={_id}
          name={name}
          onBlur={e => onBlur(e.target.value)}
          onChange={e => onChange(e.target.value)}
          pattern={pattern}
          placeholder={placeholder}
          required={required ? 'required' : false}
          value={value}
        />
      ) : (
        <input
          id={_id}
          name={name}
          onBlur={e => onBlur(e.target.value)}
          onChange={e => onChange(e.target.value)}
          pattern={pattern}
          placeholder={placeholder}
          type={type}
          min={min}
          max={max}
          required={required ? 'required' : false}
          value={value}
        />
      )}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number
};

TextField.defaultProps = {
  address: '',
  className: '',
  onBlur: () => {},
  onChange: () => {},
  placeholder: '',
  required: false,
  type: 'text',
  name: '',
  min: null,
  max: null
};

export default TextField;

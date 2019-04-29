import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './FormFlash.scss';

const FormFlash = ({ className, message, success, error }) => {
  console.log('FormFlash RENDER');
  const classes = cx(
    styles['FormFlash'],
    className,
    'py1 px2 transition-enter',
    {
      [styles['FormFlash--success']]: success,
      [styles['FormFlash--error']]: error
    }
  );
  return (
    <div className={classes}>
      <p className="copy bold">{message}</p>
    </div>
  );
};

FormFlash.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  success: PropTypes.bool,
  error: PropTypes.bool
};

FormFlash.defaultProps = {
  className: 'my3',
  message: '',
  success: false,
  error: false
};

export default FormFlash;

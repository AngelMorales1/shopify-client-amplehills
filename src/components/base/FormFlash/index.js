import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './FormFlash.scss';

const FormFlash = ({ message, success, error }) => {
  const classes = cx(styles['FormFlash'], 'p2 my3', {
    [styles['FormFlash--success']]: success,
    [styles['FormFlash--error']]: error
  });
  return (
    <div className={classes}>
      <p className="copy">{message}</p>
    </div>
  );
};

FormFlash.propTypes = {
  message: PropTypes.string,
  success: PropTypes.bool,
  error: PropTypes.bool
};

FormFlash.defaultProps = {
  message: '',
  success: false,
  error: false
};

export default FormFlash;

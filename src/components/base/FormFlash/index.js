import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Button, Image } from 'components/base';
import styles from './FormFlash.scss';

const FormFlash = ({ className, message, success, error, unsetFlash }) => {
  const classes = cx(
    styles['FormFlash'],
    className,
    'flex py1 px2 transition-enter justify-between',
    {
      [styles['FormFlash--success']]: success,
      [styles['FormFlash--error']]: error
    }
  );
  return (
    <div className={classes}>
      <p className="copy bold">{message}</p>
      {unsetFlash && (
        <Button
          ariaLabel="Close this message"
          variant="style-none"
          onClick={unsetFlash}
          className="mx1"
        >
          <Image alt="Close button" src="/assets/images/close-icon-navy.svg" />
        </Button>
      )}
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

import React from 'react';
import PropTypes from 'prop-types';

import styles from './Radio.scss';

const Radio = ({ className, label }) => {
  return (
    <div className={`${styles['Radio']} ${className} text-peach link-text`}>
      {label}
    </div>
  );
};

Radio.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string
};

Radio.defaultProps = {
  className: '',
  label: ''
};

export default Radio;

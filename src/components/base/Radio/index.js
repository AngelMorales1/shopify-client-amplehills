import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Radio.scss';

import { Image, Button } from 'components/base';

const Radio = ({ className, label }) => {
  return (
    <Button
      variant="style-none"
      onClick={onClick}
      className={cx(styles['Radio'], 'text-peach bold', className)}
    />
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

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Radio.scss';

import { Image, Button } from 'components/base';

const Radio = ({ className, label, check }) => {
  return (
    <Button className={cx(styles['Radio'], className, 'text-peach link-text')}>
      {check ? (
        <Image alt="Check icon" src="/assets/images/check-icon.svg" />
      ) : null}
      {label}
    </Button>
  );
};

Radio.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  check: PropTypes.bool
};

Radio.defaultProps = {
  className: '',
  label: '',
  check: false
};

export default Radio;

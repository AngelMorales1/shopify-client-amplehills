import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Image } from 'components/base';

import styles from './Alert.scss';

const Alert = () => {
  return (
    <div
      className={cx(
        styles['Alert'],
        'z-nav w100 fixed l0 t0 bg-madison-blue bold flex flex-row justify-center items-center'
      )}
    >
      <span className="text-white">
        Free Shipping all over the United States.
      </span>
      <span className={cx(styles['Alert__order-now'], 'text-peach')}>
        Order now!
      </span>
    </div>
  );
};

export default Alert;

Alert.propTypes = {};

Alert.defaultProps = {};

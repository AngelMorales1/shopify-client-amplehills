import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { PortableText } from 'components/base';

import styles from './Alert.scss';

const Alert = ({ alert }) => {
  return (
    <div
      className={cx(
        styles['Alert'],
        'z-overlay w100 fixed l0 t0 px1 bg-madison-blue bold flex flex-row justify-center items-center flex-wrap transition-fade-in center'
      )}
    >
      <span className={cx(styles['Alert__text'], 'text-white')}>
        <PortableText blocks={alert} />
      </span>
      {/* {alert.linkCopy && alert.linkUrl && ( */}
      {/* <a
        className={cx(
          styles['Alert__linked-text'],
          styles['Alert__text'],
          'text-peach'
        )}
        rel="noopener"
        href="/products/build-your-own"
      >
        Shop Now
      </a> */}
      {/* )} */}
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.shape({
    alertCopy: PropTypes.string,
    linkCopy: PropTypes.string,
    linkUrl: PropTypes.string,
    title: PropTypes.string
  })
};

Alert.defaultProps = {
  alert: {
    alertCopy: '',
    linkCopy: '',
    linkUrl: '',
    title: ''
  }
};

export default Alert;

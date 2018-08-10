import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import styles from './Alert.scss';

const Alert = ({ alert }) => {
  const fields = get(alert, 'fields', {});

  return (
    <div
      className={cx(
        styles['Alert'],
        'z-nav w100 fixed l0 t0 bg-madison-blue bold flex flex-row justify-center items-center transition-fade-in'
      )}
    >
      <span className={cx(styles['Alert__text'], 'text-white')}>
        {fields.alertCopy}
      </span>
      <a
        className={cx(
          styles['Alert__linked-text'],
          styles['Alert__text'],
          'text-peach'
        )}
        rel="noopener"
        href={`${fields.linkUrl}`}
      >
        {fields.linkCopy}
      </a>
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.shape({
    fields: PropTypes.shape({
      alertCopy: PropTypes.string,
      linkCopy: PropTypes.string,
      linkUrl: PropTypes.string,
      title: PropTypes.string
    })
  })
};

Alert.defaultProps = {
  alert: {
    fields: {
      alertCopy: '',
      linkCopy: '',
      linkUrl: '',
      title: ''
    }
  }
};

export default Alert;

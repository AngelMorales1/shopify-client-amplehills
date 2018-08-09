import React from 'react';
import cx from 'classnames';
import get from 'utils/get';
import { Button } from 'components/base';

import styles from './Alert.scss';

const Alert = ({ alert }) => {
  const fields = get(alert, 'fields', {});

  return (
    <div
      className={cx(
        styles['Alert'],
        'z-nav w100 fixed l0 t0 bg-madison-blue bold flex flex-row justify-center items-center'
      )}
    >
      <span className={cx(styles['Alert__text'], 'text-white')}>
        {fields.alertCopy}
      </span>
      <Button
        to={fields.linkUrl}
        variant="style-none"
        className={cx(
          styles['Alert__order-now'],
          styles['Alert__text'],
          'text-peach'
        )}
        label={fields.linkCopy}
      />
    </div>
  );
};

export default Alert;

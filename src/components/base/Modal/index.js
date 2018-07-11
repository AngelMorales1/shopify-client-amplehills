import React from 'react';
import cx from 'classnames';

import styles from './Modal.scss';

const Modal = ({ className, children }) => {
  return (
    <div
      className={cx(
        styles['Modal'],
        className,
        'fixed-cover bg-white-wash flex justify-center items-center'
      )}
    >
      <div
        className={cx(
          styles['Modal__inner'],
          'text-container-width bg-white card drop-shadow p3'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

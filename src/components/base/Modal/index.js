import React from 'react';
import cx from 'classnames';

const Modal = ({ className, children }) => {
  return (
    <div
      className={cx(
        className,
        'fixed-cover bg-white-wash flex justify-center items-center transition-fade-in'
      )}
    >
      <div className="text-container-width w100 bg-white card drop-shadow p3 transition-slide-up-large-long">
        {children}
      </div>
    </div>
  );
};

export default Modal;

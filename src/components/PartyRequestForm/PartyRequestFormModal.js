import React from 'react';
import cx from 'classnames';

import styles from './PartyRequestForm.scss';
import { Button } from 'components/base';

const PartyRequestFormModal = ({ children, onCloseClick, title }) => {
  return (
    <div
      className={cx(
        'overflow-scroll fixed-cover bg-white-wash flex justify-center items-center transition-fade-in'
      )}
    >
      <div
        className={cx(
          'wh100 modal modal--light-gray-border max-width-2 mx-auto relative flex items-center justify-center bg-white drop-shadow transition-slide-up-large-long'
        )}
      >
        <div className="wh100 m-auto flex flex-column mb3 justify-center">
          <div
            className={cx(
              styles['PartyRequestForm__modal__info'],
              'absolute t0 l0 w100 p3 overflow-scroll'
            )}
          >
            <h3 className="callout mb3">{title}</h3>
            {children}
          </div>
          <div
            className={cx(
              styles['PartyRequestForm__modal__close-bar'],
              'absolute b0 l0 w100 p1 bg-white flex flex-row justify-end items-center'
            )}
          >
            <Button
              color="madison-blue"
              variant="primary-small"
              label="Close"
              onClick={onCloseClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyRequestFormModal;

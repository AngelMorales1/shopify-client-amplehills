import React from 'react';
import cx from 'classnames';

import styles from './PartyRequestForm.scss';
import { Button } from 'components/base';

const PartyRequestFormModal = ({ children, onCloseClick }) => {
  return (
    <div
      className={cx(
        styles['PartyRequestForm__modal'],
        'overflow-scroll fixed-cover bg-white-wash flex justify-center items-center transition-fade-in'
      )}
    >
      <div
        className={cx(
          styles['PartyRequestForm__modal-content-container'],
          'relative flex items-center justify-center bg-white drop-shadow transition-slide-up-large-long'
        )}
      >
        <div className="wh100 m-auto flex flex-column mb3 justify-center">
          <div>
            <h2 className="block-headline m3 pt3 mb3">More Info</h2>
            {children}
          </div>
          <div>
            <Button
              className={cx(
                styles['PartyRequestForm__modal-close-button'],
                'right'
              )}
              color="madison-blue"
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

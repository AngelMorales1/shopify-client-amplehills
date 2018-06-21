import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';
import styles from './OurPledgeOverlay.scss';

import { Image } from 'components/base';

class OurPledgeOverlay extends Component {
  render() {
    const {
      closeOurPledgeOverlay,
      overlayContentImage,
      shippingInformation,
      shippingPledge
    } = this.props;

    const overlayContentImageUrl = get(
      overlayContentImage,
      'fields.file.url',
      ''
    );
    return (
      <div className={cx('wh100', styles['OurPledgeOverlay'])}>
        <div className="wh100 t0 l0 bg-white low-opacity z-overlay fixed" />
        <div
          className={cx(
            'fixed bg-island-spice z-overlay',
            styles['OurPledgeOverlay__circle-background']
          )}
        >
          <div
            className={cx(
              'flex flex-column items-center z-overlay m3 t0 r0 fixed',
              styles['OurPledgeOverlay__content']
            )}
          >
            <button
              onClick={closeOurPledgeOverlay}
              className={cx(
                't0 r0 m3 fixed pointer',
                styles['OurPledgeOverlay__button']
              )}
            >
              <Image alt="Close button" src="/assets/images/close-icon.svg" />
            </button>
            <div className={cx(styles['OurPledgeOverlay__text-content'])}>
              <h2 className="m2 big text-madison-blue">We Ship Nationwide</h2>
              <div>
                <Image
                  alt="Our pledge image"
                  src={overlayContentImageUrl}
                  className={cx('my3', styles['OurPledgeOverlay__image'])}
                />
                <h2 className="my2 big text-madison-blue">
                  Shipping information
                </h2>
                <p className="mb4 small text-madison-blue">
                  {shippingInformation}
                </p>
              </div>
              <div>
                <h2 className="my2 big text-madison-blue">Shipping Pledge</h2>
                <p className="small text-madison-blue">{shippingPledge}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OurPledgeOverlay;

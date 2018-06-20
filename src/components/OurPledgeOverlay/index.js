import React, { Component } from 'react';
import cx from 'classnames';
import styles from './OurPledgeOverlay.scss';

import { Image } from 'components/base';

class OurPledgeOverlay extends Component {
  render() {
    return (
      <div className={cx('wh100', styles['OurPledgeOverlay'])}>
        <div
          className={cx(
            'wh100 t0 l0 bg-white low-opacity z-overlay',
            styles['OurPledgeOverlay__base-background']
          )}
        />
        <div
          className={cx(
            'text-black z-overlay wh100 t0 r0',
            styles['OurPledgeOverlay__container']
          )}
        >
          <Image
            alt="Our pledge overlay background"
            src="/assets/images/our-pledge-overlay-background.svg"
            className={cx(
              'r0 t0',
              styles['OurPledgeOverlay__container__background']
            )}
          />
          <div
            className={cx(
              'flex flex-column justify-center items-center z-overlay m3 col-5 t0 r0',
              styles['OurPledgeOverlay__container__content']
            )}
          >
            <Image
              alt="Close button"
              src="/assets/images/close-button.svg"
              className={cx('close-button self-end')}
            />
            <div className={cx('border m4 col-8')}>
              <div>We Ship Nationwide</div>
              <div>
                <h2>Shipping information</h2>
                <p>
                  We are receiving a very high demand for our ice cream both
                  in-store and for shipping nationwide. As a result, we need to
                  limit the amount of ice cream that is sold online each day to
                  ensure there is enough ice cream for everyone. The next
                  available shipping day is preselected by default. You will
                  receive your ice cream 1-2 days after your ship day, depending
                  on shipping speed selected in checkout. You're welcome to
                  choose a ship day in the future if desired.
                </p>
              </div>
              <div>
                <h2>Shipping Pledge</h2>
                <p>
                  Everyone loves receiving the gift of ice cream at their
                  doorstep but no one likes receiving melted ice cream. This is
                  why we will happily reship your ice cream or issue you a full
                  refund if it does not arrive perfect, delicious and frozen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OurPledgeOverlay;

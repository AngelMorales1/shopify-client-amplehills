import React, { Component } from 'react';
import cx from 'classnames';
import styles from './OurPledgeOverlay.scss';

import { Image } from 'components/base';

class OurPledgeOverlay extends Component {
  render() {
    return (
      <div>
        <div
          className={cx(
            'wh100 t0 l0 border bg-white low-opacity z-overlay',
            styles['OurPledgeOverlay']
          )}
        >
          <Image
            alt="Our pledge overlay background"
            src="/assets/images/our-pledge-overlay-background.svg"
          />
        </div>
        <div
          className={cx(
            'text-black z-overlay',
            styles['OurPledgeOverlay__content']
          )}
        >
          <div>We Ship Nationwide</div>
          <div>
            <h2>Shipping information</h2>
            <p>
              We are receiving a very high demand for our ice cream both
              in-store and for shipping nationwide. As a result, we need to
              limit the amount of ice cream that is sold online each day to
              ensure there is enough ice cream for everyone. The next available
              shipping day is preselected by default. You will receive your ice
              cream 1-2 days after your ship day, depending on shipping speed
              selected in checkout. You're welcome to choose a ship day in the
              future if desired.
            </p>
          </div>
          <div>
            <h2>Shipping Pledge</h2>
            <p>
              Everyone loves receiving the gift of ice cream at their doorstep
              but no one likes receiving melted ice cream. This is why we will
              happily reship your ice cream or issue you a full refund if it
              does not arrive perfect, delicious and frozen.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default OurPledgeOverlay;

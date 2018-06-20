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
            <div
              onClick={this.props.handleMoreInfoClick}
              className={cx('close-button self-end')}
            >
              <Image alt="Close button" src="/assets/images/close-button.svg" />
            </div>
            <div className={cx('border m4 col-8')}>
              <div>We Ship Nationwide</div>
              <div>
                <Image
                  alt="Our pledge image"
                  src={this.props.overlayContentImage.fields.file.url}
                />
                <h2>Shipping information</h2>
                <p>{this.props.shippingInformation}</p>
              </div>
              <div>
                <h2>Shipping Pledge</h2>
                <p>{this.props.shippingPledge}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OurPledgeOverlay;

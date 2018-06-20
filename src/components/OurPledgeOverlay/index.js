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
              'flex flex-column justify-center items-center z-overlay m3 t0 r0',
              styles['OurPledgeOverlay__container__content']
            )}
          >
            <div
              onClick={this.props.handleMoreInfoClick}
              className={cx(
                'close-button t0 r0 m3',
                styles['OurPledgeOverlay__container__content__button']
              )}
            >
              <Image alt="Close button" src="/assets/images/close-button.svg" />
            </div>
            <div
              className={cx(
                'mt3 mb4 col-9',
                styles['OurPledgeOverlay__container__content__text']
              )}
            >
              <div className="m2 big text-madison-blue">We Ship Nationwide</div>
              <div>
                <Image
                  alt="Our pledge image"
                  src={this.props.overlayContentImage.fields.file.url}
                  className={cx(
                    'my3',
                    styles['OurPledgeOverlay__container__image']
                  )}
                />
                <h2 className="my2 big text-madison-blue">
                  Shipping information
                </h2>
                <p className="mb4 small text-madison-blue">
                  {this.props.shippingInformation}
                </p>
              </div>
              <div>
                <h2 className="my2 big text-madison-blue">Shipping Pledge</h2>
                <p className="small text-madison-blue">
                  {this.props.shippingPledge}
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

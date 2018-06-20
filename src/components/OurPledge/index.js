import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';
import styles from './OurPledge.scss';

import { Image } from 'components/base';
import OurPledgeOverlay from 'components/OurPledgeOverlay';

class OurPledge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ourPledgeOverlayIsOpen: true
    };
  }

  openOurPledgeOverlay = () => {
    this.setState({ ourPledgeOverlayIsOpen: true });
  };

  closeOurPledgeOverlay = () => {
    this.setState({ ourPledgeOverlayIsOpen: false });
  };

  render() {
    const {
      overlayContentImage,
      shippingInformation,
      shippingPledge,
      calloutImage
    } = this.props.ourPledge;

    const calloutImageUrl = get(calloutImage, 'fields.file.url', '');
    return (
      <div className={cx('flex flex-column items-center', styles['OurPledge'])}>
        <Image
          alt="Our pledge icon"
          src={calloutImageUrl}
          className={cx('icon z-1', styles['OurPledge__icon'])}
        />
        <div
          className={cx(
            'bg-varden p2 flex items-center',
            styles['OurPledge__text-container']
          )}
        >
          <p className="mx2 text-madison-blue bold nowrap">Our Pledge</p>
          <p className="mx2 flex uppercase text-madison-blue info-text-small semi-bold center">
            Ice cream arrives fresh delicious, and frozen
          </p>
          <button
            onClick={this.openOurPledgeOverlay}
            className={cx(
              'mx2 uppercase text-madison-blue info-text-big bold nowrap px0',
              styles['OurPledge__more-info']
            )}
          >
            More Info
          </button>
        </div>
        {this.state.ourPledgeOverlayIsOpen ? (
          <OurPledgeOverlay
            overlayContentImage={overlayContentImage}
            shippingInformation={shippingInformation}
            shippingPledge={shippingPledge}
            closeOurPledgeOverlay={this.closeOurPledgeOverlay}
          />
        ) : null}
      </div>
    );
  }
}

export default OurPledge;

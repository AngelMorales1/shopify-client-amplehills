import React, { Component } from 'react';
import cx from 'classnames';

import styles from './OurPledge.scss';
import { Image } from 'components/base';
import OurPledgeOverlay from 'components/OurPledgeOverlay';

class OurPledge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moreInfoClick: false
    };
  }

  handleMoreInfoClick = () => {
    this.setState({ moreInfoClick: !this.state.moreInfoClick });
  };

  render() {
    const {
      overlayContentImage,
      shippingInformation,
      shippingPledge
    } = this.props.ourPledge;
    return (
      <div className={cx('flex flex-column items-center', styles['OurPledge'])}>
        <Image
          alt="Our pledge icon"
          src={this.props.ourPledge.calloutImage.fields.file.url}
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
          <p
            onClick={this.handleMoreInfoClick}
            className={cx(
              'mx2 uppercase text-madison-blue info-text-big bold nowrap',
              styles['OurPledge__more-info']
            )}
          >
            More Info
          </p>
        </div>
        {this.state.moreInfoClick ? (
          <OurPledgeOverlay
            overlayContentImage={overlayContentImage}
            shippingInformation={shippingInformation}
            shippingPledge={shippingPledge}
            handleMoreInfoClick={this.handleMoreInfoClick}
          />
        ) : null}
      </div>
    );
  }
}

export default OurPledge;

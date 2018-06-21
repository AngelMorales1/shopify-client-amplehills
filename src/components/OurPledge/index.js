import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import styles from './OurPledge.scss';

import { Image, Button } from 'components/base';
import OurPledgeOverlay from 'components/OurPledgeOverlay';

class OurPledge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ourPledgeOverlayIsOpen: false
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
          <Button
            variant="style-none"
            onClick={this.openOurPledgeOverlay}
            label="More Info"
            className={cx(
              'mx2 uppercase text-madison-blue info-text-big bold nowrap',
              styles['OurPledge__more-info']
            )}
          />
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

OurPledge.propTypes = {
  ourPledge: PropTypes.shape({
    calloutImage: PropTypes.object,
    overlayContentImage: PropTypes.object,
    shippingInformation: PropTypes.string,
    shippingPledge: PropTypes.string,
    title: PropTypes.string
  })
};

OurPledge.defaultProps = {
  ourPledge: {}
};

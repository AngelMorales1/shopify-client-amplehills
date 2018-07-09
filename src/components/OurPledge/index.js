import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import styles from './OurPledge.scss';

import { Image, Button } from 'components/base';
import OurPledgeOverlay from 'components/OurPledgeOverlay';

class OurPledge extends Component {
  constructor() {
    super(...arguments);

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
      <div
        className={cx(
          'flex flex-column items-center w100',
          styles['OurPledge']
        )}
      >
        <Image
          alt="Our pledge icon"
          src={calloutImageUrl}
          className={cx('icon z-1', styles['OurPledge__icon'])}
        />
        <div
          className={cx(
            'bg-varden flex w100',
            styles['OurPledge__text-container']
          )}
        >
          <div className="col col-8 flex flex-wrap items-center">
            <p className="col col-12 md-col-6 px2 callout-small text-madison-blue nowrap">
              Our Pledge
            </p>
            <p
              className={cx(
                styles['OurPledge__text-description'],
                'col col-12 md-col-6 flex uppercase text-madison-blue info-text-small semi-bold'
              )}
            >
              Ice cream arrives fresh delicious, and frozen
            </p>
          </div>
          <div className="col col-4 px2 right-align">
            <Button
              variant="style-none"
              onClick={this.openOurPledgeOverlay}
              label="More Info"
              className={cx(
                'uppercase text-madison-blue info-text-big bold nowrap',
                styles['OurPledge__more-info']
              )}
            />
          </div>
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

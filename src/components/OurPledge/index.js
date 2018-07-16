import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import imageModel from 'models/imageModel';

import styles from './OurPledge.scss';
import { Image, Button } from 'components/base';
import OurPledgeOverlay from 'components/OurPledgeOverlay';

class OurPledge extends Component {
  openOurPledgeOverlay = () => {
    this.props.actions.openOurPledge();
  };

  closeOurPledgeOverlay = () => {
    this.props.actions.closeOurPledge();
  };

  render() {
    const {
      ourPledgeOverlayIsOpen,
      overlayContentImage,
      shippingInformation,
      shippingPledge,
      calloutImage,
      actions
    } = this.props;

    console.log(actions);

    const calloutImageUrl = get(calloutImage, 'fields.file.url', '');

    return (
      <div
        className={cx(
          'col-12 mx-auto mt3 flex flex-column items-center',
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
            'bg-varden flex items-center w100',
            styles['OurPledge__content-container']
          )}
        >
          <div
            className={cx(
              styles['OurPledge__text-content-container'],
              'flex col-8'
            )}
          >
            <p className="col md-col-6 px2 block-subheadline carter nowrap">
              Our Pledge
            </p>
            <p
              className={cx(
                styles['OurPledge__text-description'],
                'col col-12 md-col-6 px2 flex uppercase semi-bold flex'
              )}
            >
              Ice cream arrives fresh delicious, and frozen
            </p>
          </div>
          <div className="col col-4 px2 right-align flex justify-end">
            <Button
              variant="style-none"
              onClick={this.openOurPledgeOverlay}
              label="More Info"
              className={cx(
                'uppercase info-text-big bold nowrap text-madison-blue',
                styles['OurPledge__more-info']
              )}
            />
          </div>
        </div>
        <OurPledgeOverlay
          overlayContentImage={overlayContentImage}
          shippingInformation={shippingInformation}
          shippingPledge={shippingPledge}
          closeOurPledgeOverlay={this.closeOurPledgeOverlay}
          ourPledgeOverlayIsOpen={ourPledgeOverlayIsOpen}
        />
      </div>
    );
  }
}

export default OurPledge;

OurPledge.propTypes = {
  calloutImage: imageModel.propTypes,
  overlayContentImage: PropTypes.object,
  shippingInformation: PropTypes.string,
  shippingPledge: PropTypes.string,
  ourPledgeOverlayIsOpen: PropTypes.bool
};

OurPledge.defaultProps = {
  ourPledgeOverlayIsOpen: false,
  calloutImage: imageModel.default,
  overlayContentImage: {},
  shippingInformation: '',
  shippingPledge: ''
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import imageModel from 'models/imageModel';

import styles from './OurPledge.scss';
import { Image, Button } from 'components/base';
import OurPledgeOverlay from 'components/OurPledgeOverlay';

class OurPledge extends Component {
  constructor(props) {
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
    } = this.props;

    const calloutImageUrl = get(calloutImage, 'fields.file.url', '');

    return (
      <div
        className={cx(
          'col-12 md-col-8 mx-auto mt3 px2 flex flex-column items-center',
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
          <p className="col col-12 md-col-4 px2 callout-medium text-madison-blue center nowrap">
            Our Pledge
          </p>
          <p
            className={cx(
              styles['OurPledge__text-description'],
              'col col-12 md-col-4 flex uppercase text-madison-blue info-text-extra-small semi-bold center flex justify-center'
            )}
          >
            Ice cream arrives fresh delicious, and frozen
          </p>
          <div className="col col-4 px2 right-align flex justify-center">
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
  calloutImage: imageModel.propTypes,
  overlayContentImage: PropTypes.object,
  shippingInformation: PropTypes.string,
  shippingPledge: PropTypes.string
};

OurPledge.defaultProps = {
  calloutImage: imageModel.default,
  overlayContentImage: {},
  shippingInformation: '',
  shippingPledge: ''
};

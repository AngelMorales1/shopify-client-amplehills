import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import imageModel from 'models/imageModel';

import styles from './OurPledge.scss';
import { Image, Button } from 'components/base';
import OurPledgeOverlay from 'components/OurPledgeOverlay';

const OurPledge = ({
  actions,
  ourPledgeOverlayIsOpen,
  overlayContentImage,
  shippingInformation,
  shippingPledge,
  calloutImage
}) => {
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
            'flex col-8 md-hide lg-hide'
          )}
        >
          <p className="col md-col-6 px2 block-subheadline carter nowrap">
            Our Pledge
          </p>
          <p
            className={cx(
              styles['OurPledge__text-description'],
              'tout col col-12 md-col-6 px2 flex uppercase semi-bold flex'
            )}
          >
            Ice cream arrives fresh delicious, and frozen
          </p>
        </div>
        <p className="col md-col-3 px2 mr2 block-subheadline carter nowrap xs-hide sm-hide">
          Our Pledge
        </p>
        <p
          className={cx(
            styles['OurPledge__text-description'],
            'tout col col-5 px2 flex uppercase semi-bold flex xs-hide sm-hide'
          )}
        >
          Ice cream arrives fresh delicious, and frozen
        </p>
        <div className="col col-4 md-col-3 px2 right-align flex flex-column justify-end">
          <div className={cx(styles['OurPledge__more-info'], 'ml-auto')}>
            <Button
              variant="style-none"
              onClick={actions.openOurPledge}
              label="More Info"
              className={cx(
                'uppercase info-text-wide bold nowrap text-madison-blue'
              )}
            />
          </div>
        </div>
      </div>
      <OurPledgeOverlay
        overlayContentImage={overlayContentImage}
        shippingInformation={shippingInformation}
        shippingPledge={shippingPledge}
        closeOurPledgeOverlay={actions.closeOurPledge}
        ourPledgeOverlayIsOpen={ourPledgeOverlayIsOpen}
      />
    </div>
  );
};

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

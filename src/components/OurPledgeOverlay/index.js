import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import styles from './OurPledgeOverlay.scss';

import { Image, Button } from 'components/base';

const OurPledgeOverlay = ({
  closeOurPledgeOverlay,
  shippingInformation,
  shippingPledge,
  ourPledgeOverlayIsOpen
}) => {
  const classes = cx(
    'z-overlay wh100 transition fixed t0 r0',
    styles['OurPledgeOverlay'],
    {
      [styles['OurPledgeOverlay--active']]: ourPledgeOverlayIsOpen
    }
  );

  return (
    <div className={classes}>
      <div className="wh100 t0 l0 bg-white low-opacity fixed" />
      <div
        className={cx(
          'fixed bg-island-spice',
          styles['OurPledgeOverlay__circle-background']
        )}
      >
        <div
          className={cx(
            'flex flex-column items-center p3 fixed',
            styles['OurPledgeOverlay__content']
          )}
        >
          <Button
            variant="style-none"
            onClick={closeOurPledgeOverlay}
            className="t0 r0 m3 fixed"
          >
            <Image alt="Close button" src="/assets/images/close-icon.svg" />
          </Button>
          <div className={cx(styles['OurPledgeOverlay__text-content'])}>
            <h2 className="mb3 block-headline text-madison-blue">
              We Ship Nationwide
            </h2>
            <div>
              <h2 className="my2 callout text-madison-blue">
                Shipping information
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: marked(shippingInformation)
                }}
                className="mb2 block-subheadline text-madison-blue"
              />
            </div>
            <div>
              <h2 className="my2 callout text-madison-blue">Shipping Pledge</h2>
              <p
                dangerouslySetInnerHTML={{ __html: marked(shippingPledge) }}
                className="block-subheadline text-madison-blue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPledgeOverlay;

OurPledgeOverlay.propTypes = {
  closeOurPledgeOverlay: PropTypes.func,
  shippingInformation: PropTypes.string,
  shippingPledge: PropTypes.string,
  ourPledgeOverlayIsOpen: PropTypes.bool
};

OurPledgeOverlay.defaultProps = {
  closeOurPledgeOverlay: () => {},
  shippingInformation: '',
  shippingPledge: '',
  ourPledgeOverlayIsOpen: false
};

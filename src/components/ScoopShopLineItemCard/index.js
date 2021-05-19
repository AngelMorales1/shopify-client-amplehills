import React from 'react';
import cx from 'classnames';

import { Image, Button, Radio } from 'components/base';
import styles from './ScoopShopLineItemCard.scss';

const ScoopShopLineItemCard = ({ location, distance }) => {
  return (
    <div
      className={cx(
        styles['ScoopShopLineItemCard'],
        'w100 flex flex-column items-center overflow-hidden'
      )}
    >
      <div
        className={cx(
          styles['ScoopShopLineItemCard__inner'],
          'flex form-container-large-width w100 my2 transition-slide-up-large bg-yellow'
        )}
      >
        <div
          className={cx(
            styles['ScoopShopLineItemCard__image-container'],
            'col-12 md-col-5 block h100 bg-sky-blue'
          )}
        >
          <Image
            src={location.image}
            className={cx(
              styles['ScoopShopLineItemCard__image'],
              'w100 h100 block'
            )}
          />
        </div>
        <div
          className={cx(
            styles['ScoopShopLineItemCard__inner-info'],
            'col-12 md-col-7 flex flex-column items-start'
          )}
        >
          <strong className="text-peach">
            <span className="xs-hide sm-hide">Scoop Shop – </span>
            <span>{distance} miles away</span>
          </strong>
          <span
            className={cx(
              styles['ScoopShopLineItemCard__title'],
              'block-headline-mobile-small text-madison-blue mb2'
            )}
          >
            {location.title}
          </span>
          <div className="flex flex-wrap mb3">
            <Radio checked={true} label="Open Now" className="mr3 mb1" />
            <Radio
              checked={true}
              label="Sells Ice Cream Pints"
              className="mb1"
            />
          </div>
          <div className="flex flex-wrap">
            <Button
              className={cx(
                styles['ScoopShopLineItemCard__directions-button'],
                'wauto mt1 mr2'
              )}
              variant="primary-small"
              color="madison-blue"
              label="Get Directions"
              to={`https://maps.google.com/?q=${location.address1}, ${
                location.city
              }, ${location.state} ${location.zip}`}
            />
            <Button
              className={cx(
                styles['ScoopShopLineItemCard__directions-button'],
                'wauto mt1'
              )}
              variant="primary-small"
              color="clear-madison-blue-border"
              label="More Info"
              to={`/location/${location.slug}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoopShopLineItemCard;

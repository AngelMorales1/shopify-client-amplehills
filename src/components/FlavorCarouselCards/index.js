import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';

import styles from './FlavorCarouselCards.scss';
import { Image } from 'components/base';

const FlavorCarouselCards = ({ flavorItems, numberOfCardToRender }) => {
  const selectedFlavorItems =
    typeof numberOfCardToRender === 'number'
      ? flavorItems.slice(0, numberOfCardToRender)
      : flavorItems;

  return (
    <Fragment>
      {selectedFlavorItems.map((flavor, i) => {
        const id = get(flavor, '_id', i);
        const title = get(flavor, 'name', '');
        const image = get(flavor, 'image.src', '');
        const label = get(flavor, 'label', '');

        return (
          <div
            key={id}
            className={cx(
              styles['FlavorCarouselCards__card'],
              'bg-white p3 flex flex-column justify-center items-center relative'
            )}
          >
            {label ? (
              <div
                className={cx(
                  styles['FlavorCarouselCards__mark'],
                  'z-subnav circle bg-pink absolute z-1 flex items-center justify-center mr2 mt3 r0 t0 p1'
                )}
              >
                <p
                  className={cx(
                    styles['FlavorCarouselCards__mark-text'],
                    'light center carter text-heavy-gray white-space-normal'
                  )}
                >
                  {label}
                </p>
              </div>
            ) : null}
            <Image
              className={cx(styles['FlavorCarouselCards__image'])}
              src={`${image}?w=300`}
              alt={title ? `${title} image` : ''}
            />
            <p
              className={cx(
                styles['FlavorCarouselCards__title'],
                'bold center pt3'
              )}
            >
              {title}
            </p>
          </div>
        );
      })}
    </Fragment>
  );
};

FlavorCarouselCards.propTypes = {
  flavorItems: PropTypes.array
};

FlavorCarouselCards.defaultProps = {
  flavorItems: []
};

export default FlavorCarouselCards;

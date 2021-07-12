import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import FlavorCarouselCards from 'components/FlavorCarouselCards';
import PressCarouselCards from 'components/PressCarouselCards';

import styles from './HorizontalCarouselBlock.scss';
import { HorizontalCarousel } from 'components/base';

const HorizontalCarouselBlock = ({ block, z, pressItems, ...props }) => {
  const setRef = get(props, 'setRef', () => {});
  const dripIsOn = get(block, 'drip', false);
  const upperDripIsOn = get(block, 'upperDrip', false);
  const backgroundColor = get(block, 'backgroundColor', 'white');
  const items = get(block, 'items', []);
  // const pressItemsInBlock = get(block, 'pressItems.simpleFragments', {});
  const numberOfCardToRender = get(block, 'showCardNumber', null);

  if (!items.length) return null;

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(
        styles['HorizontalCarouselBlock'],
        styles[`HorizontalCarouselBlock--${backgroundColor}`],
        { drip: dripIsOn, 'upper-drip': upperDripIsOn }
      )}
    >
      <HorizontalCarousel
        title={get(block, 'title', '')}
        text={get(block, 'text', '')}
        buttonLink={get(block, 'buttonLink', '')}
        buttonLabel={get(block, 'buttonLabel', '')}
        isReverseOrder={false}
      >
        {items[0] ? (
          <FlavorCarouselCards flavorItems={items} />
        ) : (
          <PressCarouselCards pressItemsInBlock={items} />
        )}
      </HorizontalCarousel>
    </div>
  );
};

HorizontalCarousel.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      buttonLabel: PropTypes.string,
      buttonLink: PropTypes.string,
      drip: PropTypes.bool,
      title: PropTypes.string,
      flavorItems: PropTypes.array
    }),
    sys: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  z: PropTypes.number,
  setRef: PropTypes.func
};

HorizontalCarousel.defaultProps = {
  block: {
    fields: {
      buttonLabel: '',
      buttonLink: '',
      drip: false,
      title: '',
      flavorItems: []
    },
    sys: {
      id: ''
    }
  },
  z: 0,
  setRef: () => {}
};

export default HorizontalCarouselBlock;

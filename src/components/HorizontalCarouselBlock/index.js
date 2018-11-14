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
  const fields = get(block, 'fields', {});
  const dripIsOn = get(fields, 'drip', false);
  const upperDripIsOn = get(fields, 'upperDrip', false);
  const backgroundColor = get(fields, 'color', 'white');
  const flavorItems = get(block, 'fields.flavorItems', []);
  const pressItemsInBlock = get(fields, 'pressItems.simpleFragments', {});
  const sortByLatest = get(fields, 'sortByLatest', true);
  const isCustomOrder =
    flavorItems.length || Object.keys(pressItemsInBlock).length;
  const numberOfCardToRender = get(fields, 'showCardNumber', null);

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
        title={get(fields, 'title', '')}
        text={get(fields, 'text', '')}
        buttonLink={get(fields, 'buttonLink', '')}
        buttonLabel={get(fields, 'buttonLabel', '')}
        isReverseOrder={!isCustomOrder && !sortByLatest ? true : false}
      >
        {flavorItems.length ? (
          <FlavorCarouselCards
            flavorItems={flavorItems}
            numberOfCardToRender={numberOfCardToRender}
          />
        ) : (
          <PressCarouselCards
            pressItemsInBlock={pressItemsInBlock}
            numberOfCardToRender={numberOfCardToRender}
            pressItems={pressItems}
          />
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

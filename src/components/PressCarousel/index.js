import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';

import styles from './PressCarousel.scss';
import { Image, Button, HorizontalCarousel } from 'components/base';

const PressCarousel = ({ block, z, pressItems, setRef }) => {
  const fields = get(block, 'fields', {});
  const isDripOn = get(fields, 'drip', false);
  const showCardNumber = get(fields, 'showCardNumber', null);
  const sortByLatest = get(fields, 'sortByLatest', true);
  const pressItemsInBlock = get(fields, 'pressItems.fragments', []);
  const isCustomOrder = !!pressItemsInBlock.length;
  const selectedPressItems = isCustomOrder
    ? pressItemsInBlock
    : get(pressItems, 'fragments', []);
  let selectedPressItemsIds = selectedPressItems.map(fragment =>
    get(fragment[0], 'value', '')
  );

  if (typeof showCardNumber === 'number') {
    selectedPressItemsIds = selectedPressItemsIds.slice(0, showCardNumber);
  }

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(styles['PressCarousel'], { drip: isDripOn }, 'bg-bees-wax')}
    >
      <HorizontalCarousel
        title={get(fields, 'title', '')}
        buttonLink={get(fields, 'buttonLink', '')}
        buttonLabel={get(fields, 'buttonLabel', '')}
        isReverseOrder={!isCustomOrder && !sortByLatest ? true : false}
      >
        {selectedPressItemsIds.map((pressItemId, i) => {
          const selectedPressItemsSimpleFragments = isCustomOrder
            ? get(fields, 'pressItems.simpleFragments', {})
            : get(pressItems, 'simpleFragments', {});
          const selectedPressItem = get(
            selectedPressItemsSimpleFragments,
            pressItemId,
            {}
          );

          return (
            <div
              key={pressItemId}
              className={cx(
                styles['PressCarousel__card'],
                'bg-white p3 flex flex-column justify-center items-center'
              )}
            >
              <Image
                className={cx(styles['PressCarousel__logo'])}
                src={get(selectedPressItem, 'logoImage.data', '')}
                alt={`${get(selectedPressItem, 'title', '')} logo`}
              />
              <span
                className={cx(
                  styles['PressCarousel__quote'],
                  'carter text-peach center py3'
                )}
              >
                {get(selectedPressItem, 'quote', '')}
              </span>
              <Button
                className={cx(
                  styles['PressCarousel__button'],
                  'uppercase detail'
                )}
                to={get(selectedPressItem, 'linkUrl', '')}
                label="Read about it"
                variant="primary-small"
                color="peach"
              />
            </div>
          );
        })}
      </HorizontalCarousel>
    </div>
  );
};

HorizontalCarousel.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      buttonLabel: PropTypes.string,
      buttonLink: PropTypes.string,
      pressItems: PropTypes.shape({
        fragments: PropTypes.arrayOf(PropTypes.array),
        simpleFragments: PropTypes.object
      }),
      customOrder: PropTypes.bool,
      drip: PropTypes.bool,
      sortByLatest: PropTypes.bool,
      title: PropTypes.string
    }),
    sys: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  z: PropTypes.number,
  pressItems: PropTypes.shape({
    fragments: PropTypes.arrayOf(PropTypes.array),
    simpleFragments: PropTypes.object
  }),
  setRef: PropTypes.func
};

HorizontalCarousel.defaultProps = {
  block: {
    fields: {
      buttonLabel: '',
      buttonLink: '',
      pressItems: {
        fragments: [],
        simpleFragments: {}
      },
      customOrder: false,
      drip: false,
      sortByLatest: true,
      title: ''
    },
    sys: {
      id: ''
    }
  },
  z: 0,
  pressItems: {
    fragments: [],
    simpleFragments: {}
  },
  setRef: () => {}
};

export default PressCarousel;

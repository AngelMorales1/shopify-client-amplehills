import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';

import styles from './PressCarouselCards.scss';
import { Image, Button, HorizontalCarousel } from 'components/base';

const PressCarouselCards = ({ pressItemsInBlock, pressItems }) => {
  const fields = get(pressItems, '');
  const isCustomOrder = pressItemsInBlock.length;
  const selectedPressItems = isCustomOrder
    ? pressItemsInBlock
    : get(pressItems, 'fragments', []);
  let selectedPressItemsIds = selectedPressItems.map(fragment =>
    get(fragment[0], 'value', '')
  );

  return (
    <Fragment>
      {selectedPressItemsIds.map((pressItemId, i) => {
        const selectedPressItemsSimpleFragments = isCustomOrder
          ? pressItemsInBlock
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
              styles['PressCarouselCards__card'],
              'bg-white p3 flex flex-column justify-center items-center'
            )}
          >
            <Image
              className={cx(styles['PressCarouselCards__logo'])}
              src={get(selectedPressItem, 'logoImage.data', '')}
              alt={`${get(selectedPressItem, 'title', '')} logo`}
            />
            <span
              className={cx(
                styles['PressCarouselCards__quote'],
                'carter text-peach center py3'
              )}
            >
              {get(selectedPressItem, 'quote', '')}
            </span>
            <Button
              className={cx(
                styles['PressCarouselCards__button'],
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
    </Fragment>
  );
};

PressCarouselCards.propTypes = {
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

PressCarouselCards.defaultProps = {
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

export default PressCarouselCards;

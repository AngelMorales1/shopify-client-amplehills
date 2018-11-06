import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';

import styles from './PressCarouselCards.scss';
import { Image, Button } from 'components/base';

const PressCarouselCards = ({
  pressItemsInBlock,
  pressItems,
  numberOfCardToRender
}) => {
  const isCustomOrder = pressItemsInBlock.length;

  const selectedPressItems = isCustomOrder
    ? pressItemsInBlock
    : get(pressItems, 'fragments', []);
  let selectedPressItemsIds = selectedPressItems.map(fragment =>
    get(fragment[0], 'value', '')
  );
  selectedPressItemsIds =
    typeof numberOfCardToRender === 'number'
      ? selectedPressItemsIds.slice(0, numberOfCardToRender)
      : selectedPressItemsIds;

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
              'bg-white p3 flex flex-column justify-between items-center'
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
                'carter text-peach center'
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
  pressItemsInBlock: PropTypes.object,
  pressItems: PropTypes.shape({
    fragments: PropTypes.array,
    simpleFragments: PropTypes.object
  })
};

PressCarouselCards.defaultProps = {
  pressItemsInBlock: {},
  pressItems: {
    fragments: [],
    simpleFragments: {}
  }
};

export default PressCarouselCards;

import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import pressItemModel from 'models/pressItemModel';

import styles from './PressCarousel.scss';
import { Image, Button, HorizontalCarousel } from 'components/base';

const PressCarousel = ({ block, z, pressItems }) => {
  const fields = get(block, 'fields', {});
  const isDripOn = get(fields, 'drip', false);
  const showCardNumber = get(fields, 'showCardNumber', null);
  const sortByLatest = get(fields, 'sortByLatest', true);
  const pressItemsIdInBlock = get(fields, 'pressItems.fragments', []);
  const isCustomOrder = !!pressItemsIdInBlock.length;
  const selectedPressItems = isCustomOrder
    ? pressItemsIdInBlock
    : get(pressItems, 'fragments', []);
  let selectedPressItemsId = selectedPressItems.map(fragment =>
    get(fragment[0], 'value', '')
  );

  if (typeof showCardNumber === 'number') {
    selectedPressItemsId = selectedPressItemsId.slice(0, showCardNumber);
  }

  return (
    <div
      style={{ zIndex: z }}
      className={cx(styles['PressCarousel'], { drip: isDripOn }, 'bg-bees-wax')}
    >
      <HorizontalCarousel
        title={get(fields, 'title', '')}
        buttonLink={get(fields, 'buttonLink', '')}
        buttonLabel={get(fields, 'buttonLabel', '')}
        isReverseOrder={!isCustomOrder && !sortByLatest ? true : false}
      >
        {selectedPressItemsId.map((pressItemId, i) => {
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
              >{`"${get(selectedPressItem, 'quote', '')}"`}</span>
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
      pressItems: PropTypes.object,
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
  pressItems: PropTypes.object
};

HorizontalCarousel.defaultProps = {
  block: {
    fields: {
      buttonLabel: '',
      buttonLink: '',
      pressItems: {},
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
  pressItems: {}
};

export default PressCarousel;

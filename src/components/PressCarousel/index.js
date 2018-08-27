import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import pressItemsModel from 'models/pressItemsModel';
import pressItems from 'state/selectors/pressItems';

import styles from './PressCarousel.scss';
import { Image, Button, HorizontalCarousel } from 'components/base';

const PressCarousel = ({ block, z, latestPressItems }) => {
  const type = get(
    block,
    'sys.contentType.sys.id',
    'blockPressHorizontalCarousel'
  );
  const fields = get(block, 'fields', {});
  const isDripOn = get(fields, 'drip', false);
  const showCardNumber = get(fields, 'showCardNumber', null);
  const sortByLatest = get(fields, 'sortByLatest', true);
  const isCustomOrder = !get(fields, 'pressItems', []).length;
  let selectedPressItems = isCustomOrder
    ? get(fields, 'pressItems')
    : latestPressItems;
  if (typeof showCardNumber === 'number') {
    selectedPressItems = pressItems.slice(0, showCardNumber);
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
        {selectedPressItems.map((pressItem, i) => {
          const fields = get(pressItem, 'fields', {});

          return (
            <div
              key={get(pressItem, 'sys.id', '') + i}
              className={cx(
                styles['PressCarousel__card'],
                'bg-white p3 flex flex-column justify-center items-center'
              )}
            >
              <Image
                className={cx(styles['PressCarousel__logo'])}
                src={contentfulImgUtil(
                  get(fields, 'logoImage.fields.file.url', ''),
                  '200',
                  'png'
                )}
                alt={`${fields.title} logo`}
              />
              <span
                className={cx(
                  styles['PressCarousel__quote'],
                  'carter text-peach center py3'
                )}
              >{`"${fields.quote}"`}</span>
              <Button
                className={cx(
                  styles['PressCarousel__button'],
                  'uppercase detail'
                )}
                to={fields.linkUrl}
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

export default PressCarousel;

HorizontalCarousel.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      buttonLabel: PropTypes.string,
      buttonLink: PropTypes.string,
      pressItems: pressItemsModel.propTypes,
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
  latestPressItems: pressItemsModel.propTypes
};

HorizontalCarousel.defaultProps = {
  block: {
    fields: {
      buttonLabel: '',
      buttonLink: '',
      pressItems: pressItemsModel.default,
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
  latestPressItems: pressItemsModel.default
};

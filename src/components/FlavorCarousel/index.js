import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';

import styles from './FlavorCarousel.scss';
import { Image, HorizontalCarousel } from 'components/base';

const FlavorCarousel = ({ block, z, ...props }) => {
  const setRef = get(props, 'setRef', () => {});
  const fields = get(block, 'fields', {});
  const isDripOn = get(fields, 'drip', false);
  const showCardNumber = get(fields, 'showCardNumber', null);
  const flavorItems = get(block, 'fields.flavorItems', []);
  const selectedFlavorItems =
    typeof showCardNumber === 'number'
      ? flavorItems.slice(0, showCardNumber)
      : flavorItems;
  const backdroundColor = get(fields, 'color', 'yellow');

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(
        styles['FlavorCarousel'],
        styles[`FlavorCarousel--${backdroundColor}`],
        { drip: isDripOn }
      )}
    >
      <HorizontalCarousel
        title={get(fields, 'title', '')}
        buttonLink={get(fields, 'buttonLink', '')}
        buttonLabel={get(fields, 'buttonLabel', '')}
        isReverseOrder={false}
      >
        {selectedFlavorItems.map((flavor, i) => {
          const id = get(flavor, 'sys.id', i);
          const fields = get(flavor, 'fields', {});
          const title = get(fields, 'title', '');
          const image = get(fields, 'image.fields.file.url', '');
          const label = get(fields, 'label', '');

          return (
            <div
              key={id}
              className={cx(
                styles['FlavorCarousel__card'],
                'bg-white p3 flex flex-column justify-center items-center relative'
              )}
            >
              {label ? (
                <div
                  className={cx(
                    styles['FlavorCarousel__mark'],
                    'z-subnav circle bg-pastel-pink absolute z-1 flex items-center justify-center mr2 mt3 r0 t0 p1'
                  )}
                >
                  <p
                    className={cx(
                      styles['FlavorCarousel__mark-text'],
                      'light center carter text-heavy-gray white-space-normal'
                    )}
                  >
                    {label}
                  </p>
                </div>
              ) : null}
              <Image
                className={cx(styles['FlavorCarousel__image'])}
                src={image}
                alt={`${title} image`}
              />
              <p className="bold center pt3">{title}</p>
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

export default FlavorCarousel;

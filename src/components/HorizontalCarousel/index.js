import React from 'react';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';

import styles from './HorizontalCarousel.scss';
import { Image, Button } from 'components/base';

const HorizontalCarousel = ({ block, z, press }) => {
  const type = get(
    block,
    'sys.contentType.sys.id',
    'blockPressHorizontalCarousel'
  );
  const fields = get(block, 'fields', {});
  const isDripOn = get(fields, 'drip', false);
  const customOrder = get(fields, 'customOrder', false);

  const getCardItems = () => {
    switch (type) {
      case 'blockPressHorizontalCarousel':
        return customOrder ? get(fields, 'cardItems', []) : press;
    }
  };

  return (
    <div
      style={{ zIndex: z }}
      className={cx(
        styles['HorizontalCarousel'],
        { drip: isDripOn },
        'bg-bees-wax'
      )}
    >
      <div className={cx(styles['HorizontalCarousel__wrapper'], 'flex')}>
        <div
          className={cx(
            styles['HorizontalCarousel__title-container'],
            'flex flex-column justify-center'
          )}
        >
          <span
            className={cx(
              styles['HorizontalCarousel__title'],
              'center block-headline my3'
            )}
          >
            {get(fields, 'title', '')}
          </span>
          <Button
            className="inline-block"
            to={get(fields, 'buttonLink', '')}
            label={get(fields, 'buttonLabel', '')}
            color="peach"
          />
        </div>
        <div
          className={cx(
            styles['HorizontalCarousel__carousel-container'],
            'flex flex-row my4'
          )}
        >
          {getCardItems().map((cardItem, i) => {
            const fields = get(cardItem, 'fields', {});

            return (
              <div
                key={get(cardItem, 'sys.id', '') + i}
                className={cx(
                  styles['HorizontalCarousel__card'],
                  'bg-white p3 flex flex-column justify-center items-center'
                )}
              >
                <Image
                  className={cx(styles['HorizontalCarousel__logo'])}
                  src={contentfulImgUtil(
                    fields.logoImage.fields.file.url,
                    '200',
                    'png'
                  )}
                  alt={`${fields.title} logo`}
                />
                <span
                  className={cx(
                    styles['HorizontalCarousel__quote'],
                    'carter text-peach center py3'
                  )}
                >{`"${fields.quote}"`}</span>
                <Button
                  className={cx(
                    styles['HorizontalCarousel__button'],
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
        </div>
      </div>
    </div>
  );
};

export default HorizontalCarousel;

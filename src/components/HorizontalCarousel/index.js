import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import imageModel from 'models/imageModel';

import styles from './HorizontalCarousel.scss';
import { Image, Button } from 'components/base';

const HorizontalCarousel = ({ block, z, pressItems }) => {
  const type = get(
    block,
    'sys.contentType.sys.id',
    'blockPressHorizontalCarousel'
  );
  const fields = get(block, 'fields', {});
  const isDripOn = get(fields, 'drip', false);
  const customOrder = get(fields, 'customOrder', false);
  const showCardNumber = get(fields, 'showCardNumber', null);
  const customPressItems = get(fields, 'pressItems', []);
  const isSortByLatest = get(fields, 'sortByLatest', true);

  const sortCardItems = (customOrderCards, everyCards) => {
    let selectedCards = [];

    if (customOrder) {
      selectedCards = customOrderCards;
    } else {
      selectedCards = everyCards.sort();
    }
  };

  const getCardItems = () => {
    switch (type) {
      case 'blockPressHorizontalCarousel':
        return customOrder ? get(fields, 'cardItems', []) : [];
    }

    if (isSortByLatest) {
      selectedCards = selectedCards.reverse();
    }

    return typeof showCardNumber === 'number'
      ? selectedCards.slice(0, showCardNumber)
      : selectedCards;
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
            styles['HorizontalCarousel__text-container'],
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
                key={get(cardItem, 'sys.id', i)}
                className={cx(
                  styles['HorizontalCarousel__card'],
                  'bg-white p3 flex flex-column justify-center items-center'
                )}
              >
                <Image
                  className={cx(styles['HorizontalCarousel__logo'])}
                  src={fields.logoImage.fields.file.url}
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
          {type === 'blockPressHorizontalCarousel'
            ? sortCardItems(customPressItems, pressItems).map(
                (pressItem, i) => {
                  const fields = get(pressItem, 'fields', {});

                  return (
                    <div
                      key={get(pressItem, 'sys.id', i)}
                      className={cx(
                        styles['HorizontalCarousel__card'],
                        'bg-white p3 flex flex-column justify-center items-center'
                      )}
                    >
                      <Image
                        className={cx(styles['HorizontalCarousel__logo'])}
                        src={contentfulImgUtil(
                          get(fields, 'logoImage.fields.file.url', ''),
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
                }
              )
            : null}
        </div>
      </div>
    </div>
  );
};

HorizontalCarousel.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      buttonLabel: PropTypes.string,
      buttonLink: PropTypes.string,
      pressItems: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.shape({
            linkUrl: PropTypes.string,
            logoImage: imageModel.propTypes,
            quote: PropTypes.string,
            title: PropTypes.string
          }),
          sys: PropTypes.shape({
            id: PropTypes.string
          })
        })
      ),
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
  press: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        linkUrl: PropTypes.string,
        logoImage: imageModel.propTypes,
        quote: PropTypes.string,
        title: PropTypes.string
      }),
      sys: PropTypes.shape({
        id: PropTypes.string
      })
    })
  )
};

HorizontalCarousel.defaultProps = {
  block: {
    fields: {
      buttonLabel: '',
      buttonLink: '',
      pressItems: [
        {
          fields: {
            linkUrl: '',
            logoImage: imageModel.default,
            quote: '',
            title: ''
          },
          sys: {
            id: ''
          }
        }
      ],
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
  press: [
    {
      fields: {
        linkUrl: '',
        logoImage: imageModel.default,
        quote: '',
        title: ''
      },
      sys: {
        id: ''
      }
    }
  ]
};

export default HorizontalCarousel;

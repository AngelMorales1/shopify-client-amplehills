import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';

import styles from './CardsBlock.scss';
import { Button, Image } from 'components/base';

const CardsBlock = ({ cardsBlock }) => {
  const cardBlock1 = get(cardsBlock, 'cardBlock1', {});
  const cardBlock2 = get(cardsBlock, 'cardBlock2', {});

  return (
    <div
      className={cx(
        styles['CardsBlock'],
        'w100 p3 mt4 flex content-width mx-auto'
      )}
    >
      {Object.values(cardBlock1).length ? (
        <div className="col-12 md-col-6">
          <Button
            to={cardBlock1.link}
            className="text-white"
            variant="style-none"
          >
            <div
              className={cx(
                styles['CardsBlock__card'],
                styles[`CardsBlock__card--${cardBlock1.color}`],
                'flex flex-column items-center justify-between p3 m1'
              )}
            >
              <Image
                className={cx(styles['CardsBlock__card-image'], 'mt2')}
                src={contentfulImgUtil(cardBlock1.image, '300', 'png')}
              />
              <p className="py2">{cardBlock1.text}</p>
            </div>
          </Button>
        </div>
      ) : null}
      {Object.values(cardBlock2).length ? (
        <div className="col-12 md-col-6">
          <Button
            to={cardBlock2.link}
            className="text-white"
            variant="style-none"
          >
            <div
              className={cx(
                styles['CardsBlock__card'],
                styles[`CardsBlock__card--${cardBlock2.color}`],
                'flex flex-column items-center justify-between p3 m1'
              )}
            >
              <Image
                className={cx(styles['CardsBlock__card-image'], 'mt2')}
                src={contentfulImgUtil(cardBlock2.image, '300', 'png')}
              />
              <p className="py2">{cardBlock2.text}</p>
            </div>
          </Button>
        </div>
      ) : null}
    </div>
  );
};

CardsBlock.propTypes = {
  cardBlock1: PropTypes.shape({
    color: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    text: PropTypes.string
  }),
  cardBlock2: PropTypes.shape({
    color: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    text: PropTypes.string
  })
};

CardsBlock.defaultProps = {
  cardBlock1: {},
  cardBlock2: {}
};

export default CardsBlock;

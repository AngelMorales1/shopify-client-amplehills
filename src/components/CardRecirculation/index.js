import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import imageModel from 'models/imageModel';

import styles from './CardRecirculation.scss';
import { Button, Image } from 'components/base';

const CardRecirculation = ({ block }) => {
  const text1 = get(block, 'text1', '');
  const link1 = get(block, 'link1', '');
  const color1 = get(block, 'color1', '');
  const image1 = get(block, 'image1.src', '');

  const text2 = get(block, 'text2', '');
  const link2 = get(block, 'link2', '');
  const color2 = get(block, 'color2', '');
  const image2 = get(block, 'image2.src', '');

  return (
    <div
      className={cx(
        styles['CardRecirculation'],
        'w100 p3 mt4 flex content-width mx-auto'
      )}
    >
      {!!text1 && !!link1 && (
        <div className="col-12 md-col-6 m1">
          <Button to={link1} className="text-white w100" variant="style-none">
            <div
              className={cx(
                styles['CardRecirculation__card'],
                styles[`CardRecirculation__card--${color1}`],
                'flex flex-column items-center justify-between p3 w100'
              )}
            >
              <Image
                className={cx(styles['CardRecirculation__card-image'], 'mt2')}
                src={`${image1}?w=600`}
              />
              <p className="w100 py2 center line-height white-space-normal">
                {text1}
              </p>
            </div>
          </Button>
        </div>
      )}
      {!!text2 && !!link2 && (
        <div className="col-12 md-col-6 m1">
          <Button to={link2} className="text-white w100" variant="style-none">
            <div
              className={cx(
                styles['CardRecirculation__card'],
                styles[`CardRecirculation__card--${color2}`],
                'flex flex-column items-center justify-between p3 w100'
              )}
            >
              <Image
                className={cx(styles['CardRecirculation__card-image'], 'mt2')}
                src={`${image2}?w=600`}
              />
              <p className="w100 py2 center line-height white-space-normal">
                {text2}
              </p>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

CardRecirculation.propTypes = {
  fields: PropTypes.shape({
    card1Color: PropTypes.string,
    card1Image: imageModel.propTypes,
    card1Link: PropTypes.string,
    card1Text: PropTypes.string,
    card2Color: PropTypes.string,
    card2Image: imageModel.propTypes,
    card2Link: PropTypes.string,
    card2Text: PropTypes.string,
    title: PropTypes.string
  })
};

CardRecirculation.defaultProps = {
  fields: {
    card1Color: '',
    card1Image: imageModel.default,
    card1Link: '',
    card1Text: '',
    card2Color: '',
    card2Image: imageModel.default,
    card2Link: '',
    card2Text: '',
    title: ''
  }
};

export default CardRecirculation;

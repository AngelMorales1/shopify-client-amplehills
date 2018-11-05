import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import imageModel from 'models/imageModel';

import styles from './CardRecirculation.scss';
import { Button, Image } from 'components/base';

const CardRecirculation = ({ block }) => {
  const fields = get(block, 'fields', {});
  const card1HasData = Object.keys(fields).find(field =>
    field.includes('card1')
  );
  const card1Color = get(fields, 'card1Color', 'dark-blue');
  const card2HasData = Object.keys(fields).find(field =>
    field.includes('card2')
  );
  const card2Color = get(fields, 'card2Color', 'dark-blue');

  return (
    <div
      className={cx(
        styles['CardRecirculation'],
        'w100 p3 mt4 flex content-width mx-auto'
      )}
    >
      {card1HasData ? (
        <div className="col-12 md-col-6 m1">
          <Button
            to={get(fields, 'card1Link', '')}
            className="text-white w100"
            variant="style-none"
          >
            <div
              className={cx(
                styles['CardRecirculation__card'],
                styles[`CardRecirculation__card--${card1Color}`],
                'flex flex-column items-center justify-between p3 w100'
              )}
            >
              <Image
                className={cx(styles['CardRecirculation__card-image'], 'mt2')}
                src={contentfulImgUtil(
                  get(fields, 'card1Image.fields.file.url', ''),
                  '300',
                  'png'
                )}
              />
              <p className="py2">{get(fields, 'card1Text', '')}</p>
            </div>
          </Button>
        </div>
      ) : null}
      {card2HasData ? (
        <div className="col-12 md-col-6 m1">
          <Button
            to={get(fields, 'card2Link', '')}
            className="text-white w100"
            variant="style-none"
          >
            <div
              className={cx(
                styles['CardRecirculation__card'],
                styles[`CardRecirculation__card--${card2Color}`],
                'flex flex-column items-center justify-between p3 w100'
              )}
            >
              <Image
                className={cx(styles['CardRecirculation__card-image'], 'mt2')}
                src={contentfulImgUtil(
                  get(fields, 'card2Image.fields.file.url', ''),
                  '300',
                  'png'
                )}
              />
              <p className="py2">{get(fields, 'card2Text', '')}</p>
            </div>
          </Button>
        </div>
      ) : null}
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

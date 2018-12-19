import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import { Button } from 'components/base';
import styles from './FlavorCard.scss';

const FlavorCard = ({ flavor }) => {
  return (
    <Button variant="style-none" to={`/flavors/${flavor.slug}`}>
      <div
        className={cx(
          styles['FlavorCard'],
          'bg-white m2 p3 flex flex-column justify-between items-center relative'
        )}
      >
        {flavor.label ? (
          <div
            className={cx(
              styles['FlavorCard__mark'],
              'z-subnav circle bg-peach absolute z-1 flex items-center justify-center m2 r0 t0 p1',
              {
                'bg-pastel-blue': flavor.labelColor === 'blue',
                'bg-turquoise': flavor.labelColor === 'green'
              }
            )}
          >
            <p
              className={cx(
                styles['FlavorCard__mark-text'],
                'light center carter text-white white-space-normal'
              )}
            >
              {flavor.label}
            </p>
          </div>
        ) : null}
        <div
          className={cx(styles['FlavorCard__image'], 'col-12')}
          style={{
            background: `url(${contentfulImgUtil(
              flavor.image,
              '200'
            )}) no-repeat center`,
            backgroundSize: 'contain'
          }}
        />
        <p className="center bold text-madison-blue">{flavor.title}</p>
      </div>
    </Button>
  );
};

FlavorCard.propTypes = {
  flavor: PropTypes.shape({
    dietaryRestrictions: PropTypes.object,
    filters: PropTypes.object,
    id: PropTypes.string,
    image: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string
  })
};

FlavorCard.defaultProps = {
  flavor: {
    dietaryRestrictions: {},
    filters: {},
    id: '',
    image: '',
    label: '',
    title: ''
  }
};

export default FlavorCard;

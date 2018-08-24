import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import cx from 'classnames';

import styles from './HorizontalCarousel.scss';
import { Button } from 'components/base';
=======
import get from 'utils/get';
import cx from 'classnames';
import imageModel from 'models/imageModel';

import styles from './HorizontalCarousel.scss';
import { Image, Button } from 'components/base';
>>>>>>> Make HorizontalCarousel base component

const HorizontalCarousel = ({
  className,
  children,
  title,
  buttonLabel,
  buttonLink,
  isReverseOrder
}) => {
  return (
    <div
      className={cx(styles['HorizontalCarousel__wrapper'], className, 'flex')}
    >
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
          {title}
        </span>
        <Button
          className="ml1"
          to={buttonLink}
          label={buttonLabel}
          color="peach"
        />
      </div>
<<<<<<< HEAD
      <div className="px3">
        <div
          className={cx(
            styles['HorizontalCarousel__carousel-container'],
            {
              [styles[
                'HorizontalCarousel__carousel-container--reverse'
              ]]: isReverseOrder
            },
            'flex my4'
          )}
        >
          {children}
        </div>
=======
      <div
        className={cx(
          styles['HorizontalCarousel__carousel-container'],
          {
            [styles[
              'HorizontalCarousel__carousel-container--reverse'
            ]]: isReverseOrder
          },
          'flex my4'
        )}
      >
        {children}
>>>>>>> Make HorizontalCarousel base component
      </div>
    </div>
  );
};

<<<<<<< HEAD
=======
export default HorizontalCarousel;

>>>>>>> Make HorizontalCarousel base component
HorizontalCarousel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  text: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonLink: PropTypes.string,
  isReverseOrder: PropTypes.bool
};

HorizontalCarousel.defaultProps = {
  className: '',
  children: null,
  title: '',
  text: '',
  buttonLabel: '',
  buttonLink: '',
  isReverseOrder: false
};
<<<<<<< HEAD

export default HorizontalCarousel;
=======
>>>>>>> Make HorizontalCarousel base component

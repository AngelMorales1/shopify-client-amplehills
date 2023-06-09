import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './HorizontalCarousel.scss';
import { Button, PortableText } from 'components/base';

const HorizontalCarousel = ({
  className,
  children,
  title,
  buttonLabel,
  buttonLink,
  isReverseOrder,
  text
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
        <p
          className={cx(
            styles['HorizontalCarousel__text'],
            'block-headline my3'
          )}
        >
          {title}
        </p>
        {text ? (
          <div
            className={cx(
              styles['HorizontalCarousel__text'],
              'portable-text mb2'
            )}
          >
            <PortableText blocks={text} />
          </div>
        ) : null}
        {buttonLabel && buttonLink ? (
          <Button
            variant="primary-responsive"
            to={buttonLink}
            label={buttonLabel}
            color="peach"
          />
        ) : null}
      </div>
      <div
        className={cx(
          styles['HorizontalCarousel__carousel-cards-container'],
          'px3 flex flex-row'
        )}
      >
        <div
          className={cx(
            styles['HorizontalCarousel__carousel-container'],
            {
              [styles[
                'HorizontalCarousel__carousel-container--reverse'
              ]]: isReverseOrder
            },
            'flex my4 pr3'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

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

export default HorizontalCarousel;

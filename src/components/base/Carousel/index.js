import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Nuka from 'nuka-carousel';

import { Button, Image } from 'components/base';
import styles from './Carousel.scss';

class Carousel extends Component {
  state = {
    index: 0
  };

  render() {
    const {
      className,
      children,
      showArrows,
      showDots,
      arrowPreviousImage,
      arrowNextImage
    } = this.props;
    return (
      <div
        className={cx(
          className,
          'w100 flex flex-column items-center justify-center transition'
        )}
      >
        <Nuka
          renderCenterLeftControls={({ previousSlide }) =>
            showArrows ? (
              <Button
                onClick={previousSlide}
                className={styles['Carousel__arrow--previous']}
                variant="carousel-arrow"
              >
                <Image src={arrowPreviousImage} />
              </Button>
            ) : null
          }
          renderCenterRightControls={({ nextSlide }) =>
            showArrows ? (
              <Button
                onClick={nextSlide}
                className={styles['Carousel__arrow--next']}
                variant="carousel-arrow"
              >
                <Image src={arrowNextImage} />
              </Button>
            ) : null
          }
          renderBottomCenterControls={props =>
            showDots ? (
              <ul>
                {console.log(Array(props.slideCount))}
                {Array(props.slideCount).map((dot, i) => {
                  <li>
                    <Button
                      label={i === this.state.index ? '\u2022' : '\u26AC'}
                    />
                  </li>;
                })}
              </ul>
            ) : null
          }
        >
          {children}
        </Nuka>
      </div>
    );
  }
}

Carousel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  showArrows: PropTypes.bool,
  arrowNextImage: PropTypes.string,
  arrowPreviousImage: PropTypes.string
};

Carousel.defaultProps = {
  className: '',
  children: null,
  showArrows: true,
  showDots: true,
  arrowPreviousImage: '/assets/images/icon-circle-left-arrow.svg',
  arrowNextImage: '/assets/images/icon-circle-right-arrow.svg'
};

export default Carousel;

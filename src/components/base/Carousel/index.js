import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Nuka from 'nuka-carousel';

import { Button, Image } from 'components/base';
import styles from './Carousel.scss';

class Carousel extends Component {
  componentDidUpdate() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  componentDidMount() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  state = {
    index: 0
  };

  render() {
    const {
      className,
      children,
      showArrows,
      showDots,
      showDotsOnImage,
      arrowPreviousImage,
      arrowNextImage,
      onChange,
      index,
      sliderClasses,
      dotColor
    } = this.props;

    return (
      <div
        className={cx(className, 'flex flex-column justify-center transition')}
      >
        <Nuka
          className={cx('w100 flex', sliderClasses, {
            pb4: showDots && !showDotsOnImage
          })}
          slideIndex={index}
          afterSlide={index => this.setState({ index }, onChange(index))}
          renderCenterLeftControls={({ previousSlide }) =>
            showArrows ? (
              <Button
                disabled={this.state.index <= 0}
                onClick={previousSlide}
                className={cx(styles['Carousel__arrow--previous'], 'm2')}
                variant="carousel-arrow"
                shadow={true}
              >
                <Image src={arrowPreviousImage} />
              </Button>
            ) : null
          }
          renderCenterRightControls={({ nextSlide, slideCount }) =>
            showArrows ? (
              <Button
                disabled={this.state.index >= slideCount - 1}
                onClick={nextSlide}
                className={cx(styles['Carousel__arrow--next'], 'm2')}
                variant="carousel-arrow"
                shadow={true}
              >
                <Image src={arrowNextImage} />
              </Button>
            ) : null
          }
          renderBottomCenterControls={props =>
            showDots ? (
              <ul>
                {[...Array(props.slideCount)].map((dot, i) => (
                  <li
                    key={i}
                    className={cx(
                      styles['Carousel__indicator'],
                      'inline-block'
                    )}
                  >
                    <Button
                      className={cx('big', {
                        'text-peach': !dotColor,
                        'text-white': dotColor === 'white'
                      })}
                      variant="no-style"
                      label={i === this.state.index ? '\u26AC' : '\u2022'}
                      onClick={() => {
                        this.setState({ index: i }, props.goToSlide(i));
                      }}
                    />
                  </li>
                ))}
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
  showDots: PropTypes.bool,
  showDotsOnImage: PropTypes.bool,
  arrowNextImage: PropTypes.string,
  arrowPreviousImage: PropTypes.string,
  onChange: PropTypes.func,
  index: PropTypes.number,
  sliderClasses: PropTypes.string,
  dotColor: PropTypes.string
};

Carousel.defaultProps = {
  className: 'w100',
  children: null,
  showArrows: true,
  showDots: true,
  showOnImage: false,
  arrowPreviousImage: '/assets/images/icon-circle-left-arrow.svg',
  arrowNextImage: '/assets/images/icon-circle-right-arrow.svg',
  onChange: () => {},
  index: 0,
  sliderClasses: '',
  dotColor: ''
};

export default Carousel;

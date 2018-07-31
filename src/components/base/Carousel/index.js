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
      arrowNextImage,
      onChange,
      index
    } = this.props;
    return (
      <div
        className={cx(
          className,
          'w100 flex flex-column items-center justify-center transition'
        )}
      >
        <Nuka
          className={cx('w100', {
            pb4: showDots
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
                  <li key={i} className="inline-block p1">
                    <Button
                      className="big text-peach"
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
  arrowNextImage: PropTypes.string,
  arrowPreviousImage: PropTypes.string,
  onChange: PropTypes.func,
  index: PropTypes.number
};

Carousel.defaultProps = {
  className: '',
  children: null,
  showArrows: true,
  showDots: true,
  arrowPreviousImage: '/assets/images/icon-circle-left-arrow.svg',
  arrowNextImage: '/assets/images/icon-circle-right-arrow.svg',
  onChange: () => {},
  index: 0
};

export default Carousel;

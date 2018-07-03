import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Button, Image } from 'components/base';
import styles from './Carousel.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  isActive(index) {
    return this.state.active === index || (!index && !this.state.active);
  }

  handleNext(direaction) {
    if (this.state.active === false) {
      return this.setState({ active: 1 });
    }

    if (direaction === 'left') {
      const newIndex = this.state.active - 1;
      return this.setState({ active: newIndex });
    } else if (direaction === 'right') {
      const newIndex = this.state.active + 1;
      return this.setState({ active: newIndex });
    }
  }

  handleClickIndicator(index) {
    return this.setState({ active: index });
  }

  isNextItem(index) {
    if (index === this.state.active - 1) {
      return styles['Carousel--shadow-left'];
    } else if (index === this.state.active + 1) {
      return styles['Carousel--shadow-right'];
    }

    if (this.state.active === false && index === 1) {
      return styles['Carousel--shadow-left'];
    }
    return false;
  }

  render() {
    const {
      className,
      children,
      ShowArrow,
      buttonImageLeft,
      buttonImageRight,
      showIndicators,
      showNextItemShadow
    } = this.props;
    return (
      <div
        className={cx(
          className,
          'w100 flex flex-column items-center justify-center'
        )}
      >
        <div className="w100 flex justify-between items-center relative">
          {ShowArrow ? (
            <Button
              className="ml3"
              onClick={() => this.handleNext('left')}
              variant="style-none"
              disabled={this.state.active <= 0 || !this.state.active}
            >
              <Image src={buttonImageLeft} />
            </Button>
          ) : null}
          {children.map((child, i) => {
            const showNextItemShadowClass = showNextItemShadow
              ? this.isNextItem(i)
              : null;
            const classes = cx(
              styles['Carousel'],
              { [styles['Carousel--active']]: this.isActive(i) },
              showNextItemShadowClass
            );
            return (
              <div key={i} className={classes}>
                {child}
              </div>
            );
          })}
          {ShowArrow ? (
            <Button
              className="mr3"
              onClick={() => this.handleNext('right')}
              variant="style-none"
              disabled={this.state.active >= children.length - 1}
            >
              <Image src={buttonImageRight} />
            </Button>
          ) : null}
        </div>
        {showIndicators ? (
          <div className="flex">
            {children.map((child, i) => {
              const classes = cx(
                styles['Carousel__indicator'],
                { [styles['Carousel__indicator--active']]: this.isActive(i) },
                'circle square'
              );
              return (
                <Button
                  onClick={() => this.handleClickIndicator(i)}
                  variant="style-none"
                >
                  <div className={classes} />
                </Button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Carousel;

// const Carousel = ({
//   className,
//   label,
//   variant,
//   color,
//   children,
//   disabled,
//   onClick,
//   minWidth,
//   fullWidth,
//   type,
//   to
// }) => {
//   const classes = cx(
//     className,
//     styles.Carousel,
//     styles[`Carousel--${variant}`],
//     styles[`Carousel--${color}`],
//     {
//       w100: fullWidth,
//       [styles['Carousel--disabled']]: disabled
//     }
//   );

//   const linkedComponent = isExternalLink(to) ? (
//     <a
//       className={cx('text-decoration-none', {
//         'events-none': disabled
//       })}
//       href={to}
//       target="_blank"
//       rel="noopener"
//       onClick={onClick}
//     >
//       <div className={classes}>{label}</div>
//     </a>
//   ) : (
//     <Link
//       className={cx('text-decoration-none', {
//         'events-none': disabled
//       })}
//       to={to}
//       onClick={onClick}
//     >
//       <div className={classes}>{label}</div>
//     </Link>
//   );

//   return Carousel;
// };

Carousel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ShowArrow: PropTypes.bool,
  buttonImageLeft: PropTypes.string,
  buttonImageRight: PropTypes.string,
  showIndicators: PropTypes.bool,
  showNextItemShadow: PropTypes.bool
  // label: PropTypes.string,
  // variant: PropTypes.string,
  // color: PropTypes.string,

  // onClick: PropTypes.func,
  // fullWidth: PropTypes.bool,
  // disabled: PropTypes.bool,
  // type: PropTypes.string,
};

Carousel.defaultProps = {
  className: '',
  children: null,
  button: false,
  buttonImageLeft: '/assets/images/icon-circle-left-arrow.svg',
  buttonImageRight: '/assets/images/icon-circle-right-arrow.svg',
  showIndicators: false,
  showNextItemShadow: false
  // label: '',
  // variant: 'primary',
  // color: 'white-denim',
  // onClick: () => {},
  // fullWidth: false,
  // disabled: false,
  // type: 'Carousel',
};

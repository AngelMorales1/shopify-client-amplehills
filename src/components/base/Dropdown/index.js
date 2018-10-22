import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import cx from 'classnames';

import { Image } from 'components/base';
import styles from './Dropdown.scss';
// import default from '../../../constants/forms/ContactUs';

const Arrow = ({ onMouseDown, isOpen }) => {
  const src = isOpen
    ? '/assets/images/arrow-dropdown-active.svg'
    : '/assets/images/arrow-dropdown.svg';
  return <Image src={src} />;
};

const ArrowWhite = ({ onMouseDown, isOpen }) => {
  const src = isOpen
    ? '/assets/images/arrow-dropdown-active.svg'
    : '/assets/images/arrow-dropdown-white.svg';
  return <Image src={src} />;
};

const ArrowPeach = ({ onMouseDown, isOpen }) => {
  const src = isOpen
    ? '/assets/images/arrow-dropdown.svg'
    : '/assets/images/arrow-dropdown-active.svg';
  return <Image src={src} />;
};

class Dropdown extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      menuIsOpen: false
    };
  }

  renderOption = ({ option: { value } }) => {
    return <div className="my1">{value}</div>;
  };

  renderValue = ({ option: { value } }) => {
    return <div>{value}</div>;
  };

  onChange = value => {
    this.props.onChange(value);
  };

  onOpen = () => {
    this.setState({ menuIsOpen: true });
  };

  onClose = () => {
    this.setState({ menuIsOpen: false });
  };

  getArrowRenderer = color => {
    switch (color) {
      case 'white':
        return ArrowWhite;
      case 'peach':
        return ArrowPeach;
      default:
        return Arrow;
    }
  };

  render() {
    const {
      name,
      value,
      options,
      label,
      placeholder,
      variant,
      color,
      className,
      selectClassName,
      shadow
    } = this.props;
    return (
      <div
        className={cx(
          styles['Dropdown'],
          'w-auto relative z-1 pointer',
          className,
          styles[`Dropdown--${variant}`],
          {
            [styles['Dropdown--small']]: variant === 'small'
          }
        )}
      >
        {label ? (
          <label
            className={cx(
              styles['Dropdown--label'],
              'w100 inline-block mb1 bold small'
            )}
            htmlFor={name}
          >
            {label}
          </label>
        ) : null}
        <Select
          className={cx(
            styles['Dropdown'],
            'relative inline-block',
            selectClassName,
            {
              [styles['Dropdown--open']]: this.state.menuIsOpen,
              'drop-shadow': shadow
            }
          )}
          name={name}
          value={value}
          options={options}
          clearable={false}
          searchable={false}
          onOpen={this.onOpen}
          onClose={this.onClose}
          placeholder={placeholder}
          onChange={this.onChange}
          arrowRenderer={this.getArrowRenderer(color)} //{color === 'white' ? ArrowWhite : Arrow}
        />
      </div>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  shadow: PropTypes.bool
};

Dropdown.defaultProps = {
  options: [{}],
  name: '',
  placeholder: 'Select',
  className: '',
  selectClassName: '',
  label: '',
  value: '',
  variant: 'primary',
  onChange: () => {},
  shadow: false
};

export default Dropdown;

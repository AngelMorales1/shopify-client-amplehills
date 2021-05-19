import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import cx from 'classnames';

import { Image } from 'components/base';
import styles from './Dropdown.scss';

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
      bgColor,
      color,
      className,
      selectClassName,
      shadow,
      textColor,
      fixedWidth,
      textAlignCenter,
      isMulti
    } = this.props;

    let styleSet;
    if (variant === 'primary-new') {
      styleSet = {
        container: provided => ({
          ...provided,
          maxWidth: '100%'
        }),
        control: (provided, state) => ({
          ...provided,
          width: state.selectProps.width,
          background: '#ededed',
          border: 0,
          outline: 0,
          minHeight: '3.75rem',
          fontWeight: 'bold',
          fontSize: '.875rem',
          maxWidth: '100%'
        }),
        singleValue: provided => ({
          ...provided,
          color: '#13436d'
        }),
        multiValue: provided => ({
          ...provided,
          background: '#ffda8c',
          cursor: 'pointer'
        }),
        multiValueLabel: provided => ({
          ...provided,
          padding: '.5rem 1rem .25rem',
          color: '#13436d'
        }),
        valueContainer: provided => ({
          ...provided,
          padding: '0 20px'
        })
      };
    }

    if (variant === 'underline') {
      styleSet = {
        control: (provided, state) => ({
          ...provided,
          width: state.selectProps.width,
          border: '0 !important',
          boxShadow: 'none',
          outline: 0,
          background: 'transparent',
          height: '1rem',
          fontWeight: 'bold',
          fontSize: '.825rem'
        }),
        dropdownIndicator: provided => ({
          ...provided,
          padding: 0,
          marginLeft: '.25rem',
          color: '#fe5c60'
        }),
        input: provided => ({
          ...provided,
          minWidth: '2rem'
        }),
        indicatorSeparator: provided => ({
          ...provided,
          display: 'none'
        }),
        indicatorsContainer: provided => ({
          ...provided,
          height: '90%'
        }),
        singleValue: provided => ({
          ...provided,
          color: '#fe5c60'
        }),
        valueContainer: provided => ({
          ...provided,
          padding: '0 5px'
        }),
        placeholder: provided => ({
          ...provided,
          color: '#fe5c60'
        })
      };
    }

    return (
      <div
        className={cx(
          styles['Dropdown'],
          'relative z-1 pointer',
          className,
          styles[`Dropdown--${variant}`],
          styles[`Dropdown--text-${textColor}`],
          styles[`Dropdown--background-${bgColor}`],
          {
            [styles[`Dropdown--fixedWidth`]]: fixedWidth,
            [styles['Dropdown--small']]: variant === 'small',
            [styles['Dropdown--center']]: textAlignCenter
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
            'relative inline-block w100',
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
          arrowRenderer={this.getArrowRenderer(color)}
          isMulti={isMulti}
          styles={styleSet}
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
  shadow: PropTypes.bool,
  textColor: PropTypes.string,
  fixedWidth: PropTypes.bool,
  bgColor: PropTypes.string,
  textAlignCenter: PropTypes.bool
};

Dropdown.defaultProps = {
  options: [],
  name: '',
  placeholder: 'Select',
  className: '',
  selectClassName: '',
  label: '',
  value: '',
  variant: 'primary',
  onChange: () => {},
  shadow: false,
  textColor: '',
  fixedWidth: false,
  bgColor: '',
  textAlignCenter: false
};

export default Dropdown;

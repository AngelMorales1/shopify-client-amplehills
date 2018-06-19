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

class Dropdown extends Component {
  constructor(props) {
    super(props);

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

  render() {
    const { name, value, options, label, placeholder } = this.props;
    return (
      <div className="w-auto relative z-1 pointer">
        <label className="w100 inline-block mb1" htmlFor={name}>
          {label}
        </label>
        <Select
          className={cx(styles['Dropdown'], 'relative inline-block', {
            [styles['Dropdown--open']]: this.state.menuIsOpen
          })}
          name={name}
          value={value}
          options={options}
          clearable={false}
          searchable={false}
          onOpen={this.onOpen}
          onClose={this.onClose}
          placeholder={placeholder}
          onChange={this.onChange}
          arrowRenderer={Arrow}
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
  value: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  }),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string
};

Dropdown.defaultProps = {
  options: {},
  name: '',
  placeholder: 'Select',
  className: '',
  label: ''
};

export default Dropdown;

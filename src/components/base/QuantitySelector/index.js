import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import get from 'utils/get';
import { Button, TextField } from 'components/base';

class QuantitySelector extends Component {
  changeQuantity(value) {
    const quantity = this.props.allowZero
      ? Math.max(0, value)
      : Math.max(1, value);

    this.props.onChange(quantity);
  }

  colorVariation = color => {
    let buttonColor, inputColor;

    switch (color) {
      case 'madison-blue-outline':
        buttonColor = 'madison-blue-outline';
        inputColor = 'madison-blue-outline';
        break;
      case 'seafoam':
        buttonColor = 'seafoam-madison-blue-outline';
        inputColor = 'seafoam-madison-blue-outline';
        break;
      default:
        buttonColor = 'white-madison-blue-outline';
        inputColor = 'madison-blue';
    }

    return {
      buttonColor,
      inputColor
    };
  };

  render() {
    const { variant, color } = this.props;

    return (
      <div className={cx('flex', this.props.className)}>
        <Button
          variant={variant === 'small' ? 'circle-small' : 'circle'}
          color={this.colorVariation(color).buttonColor}
          label="–"
          onClick={() =>
            this.changeQuantity(get(this, 'props.quantity', 1) - 1)
          }
        />
        <TextField
          variant={variant === 'small' ? 'quantity-small' : 'quantity'}
          value={get(this, 'props.quantity', 1)}
          color={this.colorVariation(color).inputColor}
          className="copy mx2"
          onChange={value => this.changeQuantity(value)}
        />
        <Button
          variant={variant === 'small' ? 'circle-small' : 'circle'}
          color={this.colorVariation(color).buttonColor}
          label="+"
          onClick={() =>
            this.changeQuantity(get(this, 'props.quantity', 1) + 1)
          }
        />
      </div>
    );
  }
}

QuantitySelector.propTypes = {
  className: PropTypes.string,
  quantity: PropTypes.number,
  onChange: PropTypes.func,
  allowZero: PropTypes.bool
};

QuantitySelector.defaultProps = {
  className: '',
  quantity: 1,
  onChange: () => {},
  allowZero: false
};

export default QuantitySelector;

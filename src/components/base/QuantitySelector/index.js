import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Button, TextField } from 'components/base';

const QuantitySelector = ({
  className,
  quantity,
  onChange,
  allowZero,
  variant,
  color
}) => {
  const changeQuantity = value => {
    const quantity = allowZero ? Math.max(0, value) : Math.max(1, value);

    onChange(quantity);
  };

  const colorVariation = color => {
    let buttonColor, inputColor;

    switch (color) {
      case 'madison-blue-white-border':
        buttonColor = 'madison-blue-white-border';
        inputColor = 'madison-blue-border';
        break;
      case 'seafoam':
        buttonColor = 'seafoam-madison-blue-border';
        inputColor = 'seafoam-madison-blue-border';
        break;
      default:
        buttonColor = 'white-madison-blue-border';
        inputColor = 'madison-blue';
    }

    return {
      buttonColor,
      inputColor
    };
  };

  return (
    <div className={cx('flex items-center', className)}>
      <Button
        variant={variant === 'small' ? 'circle-small' : 'circle'}
        color={colorVariation(color).buttonColor}
        label="–"
        onClick={() => changeQuantity(quantity - 1)}
      />
      <TextField
        variant={variant === 'small' ? 'quantity-small' : 'quantity'}
        value={quantity}
        color={colorVariation(color).inputColor}
        className="copy mx2"
        onChange={value => changeQuantity(value)}
      />
      <Button
        variant={variant === 'small' ? 'circle-small' : 'circle'}
        color={colorVariation(color).buttonColor}
        label="+"
        onClick={() => changeQuantity(quantity + 1)}
      />
    </div>
  );
};

QuantitySelector.propTypes = {
  className: PropTypes.string,
  quantity: PropTypes.number,
  onChange: PropTypes.func,
  allowZero: PropTypes.bool,
  variant: PropTypes.string,
  color: PropTypes.string
};

QuantitySelector.defaultProps = {
  className: '',
  quantity: 1,
  onChange: () => {},
  allowZero: false,
  variant: '',
  color: ''
};

export default QuantitySelector;

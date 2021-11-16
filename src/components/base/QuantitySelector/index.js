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
  color,
  title,
  disabled
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

  const textfieldVariant = variant => {
    switch (variant) {
      case 'small':
        return 'quantity-small';
      case 'byo':
      case 'medium':
        return 'quantity-medium';
      default:
        return 'quantity';
    }
  };

  const buttonVariant = variant => {
    switch (variant) {
      case 'small':
        return 'circle-small';
      case 'byo':
      case 'medium':
        return 'circle-medium';
      default:
        return 'circle';
    }
  };

  return (
    <div
      className={cx('flex items-center', className, {
        'events-none': disabled
      })}
    >
      <Button
        ariaLabel="Decrement quantity"
        variant={buttonVariant(variant)}
        color={colorVariation(color).buttonColor}
        label="–"
        onClick={() => changeQuantity(quantity - 1)}
      />
      <TextField
        ariaLabel={`Quantity of ${title || 'item'}`}
        variant={textfieldVariant(variant)}
        value={quantity}
        color={colorVariation(color).inputColor}
        className={cx('copy', {
          mx1: variant === 'byo',
          mx2: variant !== 'byo'
        })}
        onChange={value => changeQuantity(value)}
      />
      <Button
        ariaLabel="Increment quantity"
        variant={buttonVariant(variant)}
        color={colorVariation(color).buttonColor}
        label="+"
        onClick={() => changeQuantity(quantity + 1)}
      />
    </div>
  );
};

QuantitySelector.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  quantity: PropTypes.number,
  onChange: PropTypes.func,
  allowZero: PropTypes.bool,
  variant: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool
};

QuantitySelector.defaultProps = {
  title: '',
  className: '',
  quantity: 1,
  onChange: () => {},
  allowZero: false,
  variant: '',
  color: '',
  disabled: false
};

export default QuantitySelector;

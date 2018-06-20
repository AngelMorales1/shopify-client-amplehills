import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import get from 'utils/get';
import { Button, TextField } from 'components/base';

class QuantitySelector extends Component {
  changeQuantity(value) {
    const quantity = Math.max(1, value);
    this.props.onChange(quantity);
  }

  render() {
    const { variant } = this.props;

    return (
      <div className={cx('flex', this.props.className)}>
        <Button
          variant={variant === 'small' ? 'circle-small' : 'circle'}
          color="white-madison-blue-outline"
          label="–"
          onClick={() =>
            this.changeQuantity(get(this, 'props.quantity', 1) - 1)
          }
        />
        <TextField
          variant={variant === 'small' ? 'quantity-small' : 'quantity'}
          value={get(this, 'props.quantity', 1)}
          color="madison-blue"
          className="copy mx1"
          onChange={value => this.changeQuantity(value)}
        />
        <Button
          variant={variant === 'small' ? 'circle-small' : 'circle'}
          color="white-madison-blue-outline"
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
  onChange: PropTypes.func
};

QuantitySelector.defaultProps = {
  className: '',
  quantity: 1,
  onChange: () => {}
};

export default QuantitySelector;

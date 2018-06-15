import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';

import { Button, TextField } from 'components/base';

class QuantitySelector extends Component {
  changeQuantity(value) {
    const quantity = Math.max(1, value);
    this.setState({ quantity }, this.props.onChange(quantity));
  }

  render() {
    const { className, quantity, onChange } = this.props;
    const classes = `flex ${className}`;
    return (
      <div className={classes}>
        <Button
          variant="circle"
          color="white-denim-outline"
          label="–"
          onClick={() =>
            this.changeQuantity(get(this, 'props.quantity', 1) - 1)
          }
        />
        <TextField
          variant="quantity"
          value={get(this, 'props.quantity', 1)}
          color="denim"
          className="copy mx1"
          onChange={value => this.changeQuantity(value)}
        />
        <Button
          variant="circle"
          color="white-denim-outline"
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

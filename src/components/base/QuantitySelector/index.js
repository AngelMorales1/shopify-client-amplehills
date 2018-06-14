import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, TextField } from 'components/base';

class QuantitySelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.quantity
    };
  }

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
          onClick={() => this.changeQuantity(this.state.quantity - 1)}
        />
        <TextField
          variant="quantity"
          value={this.state.quantity}
          color="denim"
          className="copy mx1"
          onChange={value => this.changeQuantity(value)}
        />
        <Button
          variant="circle"
          color="white-denim-outline"
          label="+"
          onClick={() => this.changeQuantity(this.state.quantity + 1)}
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

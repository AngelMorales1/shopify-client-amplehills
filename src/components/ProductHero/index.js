import React, { Component } from 'react';

class ProductHero extends Component {
  render() {
    return (
      <div style={{ background: this.props.data.backgroundColor }}>
        <span>{this.props.data.title}</span>
      </div>
    );
  }
}

export default ProductHero;

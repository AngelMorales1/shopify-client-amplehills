import React, { Component } from 'react';

class ProductHero extends Component {
  render() {
    return (
      <div
        className="drip"
        style={{
          background: this.props.data.backgroundColor,
          zIndex: this.props.z
        }}
      >
        <span>{this.props.data.title}</span>
      </div>
    );
  }
}

export default ProductHero;

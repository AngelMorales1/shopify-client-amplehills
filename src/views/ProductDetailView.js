import React, { Component } from "react";
import get from "utils/get";

class ProductDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <div className="ProductDetail">Product Details</div>;
  }
}

export default ProductDetailView;

import React, { Component } from "react";
import get from "utils/get";

import ProductGridCard from "components/ProductGridCard";

class ProductDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const product = model.value;

    return (
      <div className="ProductDetail">
        <h1 className="mb2">Product Details for {product.title}</h1>
        <div>
          <ProductGridCard product={product} />
        </div>
      </div>
    );
  }
}

export default ProductDetailView;

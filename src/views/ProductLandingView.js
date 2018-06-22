import React, { Component } from 'react';

import ProductGrid from 'components/ProductGrid';

class ProductLandingView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const products = model.value;

    return (
      <div className="ProductLanding">
        <ProductGrid products={products} />
      </div>
    );
  }
}

export default ProductLandingView;

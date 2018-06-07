import React, { Component } from "react";
import get from "utils/get";

import ProductGrid from "components/ProductGrid";

class ProductLandingView extends Component {
  render() {
    console.log(this.props);
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return (
      <div className="ProductLanding">
        <h1 className="mb2">ProductLanding</h1>
        <ProductGrid products={model.value} />
      </div>
    );
  }
}

export default ProductLandingView;

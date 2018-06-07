import React, { Component } from "react";
import get from "utils/get";

class ProductLandingView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <div className="ProductLanding">ProductLanding</div>;
  }
}

export default ProductLandingView;

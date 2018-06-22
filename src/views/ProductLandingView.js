import React, { Component } from 'react';

import get from 'utils/get';
import ProductGrid from 'components/ProductGrid';

class ProductLandingView extends Component {
  render() {
    const { model, products } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const content = get(model, 'content', {});
    console.log(this.props);

    return (
      <div className="ProductLanding">
        <div className="container-width mx-auto center">
          <h2 className="block-headline">{get(content, 'title', '')}</h2>
          <p className="copy">{get(content, 'description', '')}</p>
        </div>
        <ProductGrid products={products} />
      </div>
    );
  }
}

export default ProductLandingView;

import React, { Component } from 'react';

import get from 'utils/get';
import ProductGrid from 'components/ProductGrid';

class ProductLandingView extends Component {
  render() {
    const { model, products } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const content = get(model, 'landing.items[0].fields', {});
    const gridProducts = get(content, 'products', []).map(product => {
      const handle = get(product, 'fields', {}).productHandle;
      return this.props.products[handle];
    });

    return (
      <div className="ProductLanding mb3">
        <div className="my4 px3 text-container-width mx-auto center">
          <h2 className="block-headline text-peach mb2">
            {get(content, 'title', '')}
          </h2>
          <p className="block-subheadline">{get(content, 'description', '')}</p>
        </div>
        <ProductGrid products={gridProducts} />
      </div>
    );
  }
}

export default ProductLandingView;

import React, { Component } from 'react';
import marked from 'marked';

import get from 'utils/get';
import ProductGrid from 'components/ProductGrid';

class ProductLandingView extends Component {
  render() {
    const { model, products } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const content = get(model, 'landing.items[0].fields', {});
    const gridProducts = get(content, 'iceCreamProducts', []).map(product => {
      const handle = get(product, 'fields.productHandle', '');
      return products[handle];
    });

    return (
      <div className="ProductLanding mb3 transition-slide-up">
        <div className="my4 px3 text-container-width mx-auto center">
          <h2 className="block-headline text-peach mb2">
            {get(content, 'iceCreamTitle', '')}
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html: marked(get(content, 'iceCreamDescription', ''))
            }}
            className="markdown-block"
          />
        </div>
        <ProductGrid products={gridProducts} />
      </div>
    );
  }
}

export default ProductLandingView;

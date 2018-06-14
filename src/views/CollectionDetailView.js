import React, { Component } from 'react';

import ProductGrid from 'components/ProductGrid';

class CollectionDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const collection = model.value;

    return (
      <div className="CollectionDetail">
        <h1 className="mb2">CollectionDetail</h1>
        {collection.title}
        {collection.products.length && (
          <ProductGrid products={collection.products} />
        )}
      </div>
    );
  }
}

export default CollectionDetailView;

import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';

class ProductDetailView extends Component {
  render() {
    const { model } = this.props;
    console.log(this.props);
    if (model.isError) return <h1>Error</h1>;

    const { product, content } = model;
    const {
      fields: { contentBlocks }
    } = content.items[0];

    return (
      <div className="ProductDetail">
        <h1 className="mb2">Product Details for {product.title}</h1>
        <div>
          {contentBlocks.map((block, i) => (
            <BlockSwitch
              key={get(block, 'sys.id', i)}
              block={block}
              {...this.props}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductDetailView;

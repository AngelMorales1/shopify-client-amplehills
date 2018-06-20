import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';

class ProductDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const { product, content } = model;
    const contentBlocks = get(content, 'items[0].fields.contentBlocks', []);

    return (
      <div className="ProductDetailView">
        <div>
          {contentBlocks &&
            contentBlocks.map((block, i) => (
              <BlockSwitch
                key={`${i}-${get(block, 'sys.id', i)}`}
                block={block}
                product={product}
                z={contentBlocks.length - i}
                {...this.props}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default ProductDetailView;

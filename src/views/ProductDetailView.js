import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';

class ProductDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const { product, content, ourPledge } = model;
    const contentBlocks = get(content, 'items[0].fields.contentBlocks', []);
    const ourPledgeBlocks = get(ourPledge, 'items[0].fields', {});
    return (
      <div className="ProductDetailView">
        <div>
          {contentBlocks &&
            contentBlocks.map((block, i) => (
              <BlockSwitch
                key={`${i}-${get(block, 'sys.id', i)}`}
                block={block}
                product={product}
                ourPledgeBlocks={ourPledgeBlocks}
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

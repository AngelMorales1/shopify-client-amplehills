import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';

class ProductDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const {
      ourPledge,
      product,
      product: { blocks }
    } = this.props;

    console.log(this.props.product);

    return (
      <div className="ProductDetailView">
        <div>
          {blocks &&
            blocks.map((block, i) => (
              <BlockSwitch
                key={`${i}-${get(block, 'sys.id', i)}`}
                block={block}
                product={product}
                ourPledge={ourPledge}
                z={blocks.length - i}
                {...this.props}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default ProductDetailView;

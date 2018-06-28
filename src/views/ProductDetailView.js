import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';
import ProductWhatsIncluded from 'components/ProductWhatsIncluded';

class ProductDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const {
      ourPledge,
      product,
      product: { blocks }
    } = this.props;
    // const { product, content, ourPledge } = model;
    // const contentBlocks = get(content, 'items[0].fields.contentBlocks', []);
    // const ourPledgeBlocks = get(ourPledge, 'items[0].fields', {});
    // const productDetailBlocks = contentBlocks.filter(
    //   contentBlock =>
    //     get(contentBlock, 'sys.contentType.sys.id', '') ===
    //     'blockProductDetails'
    // );
    // const productDetailBlocks = get(blocks, '[1].fields.productDetails', [])
    // console.log(product)
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
          {/* <ProductWhatsIncluded
            productDetails={productDetailBlocks}
          /> */}
        </div>
      </div>
    );
  }
}

export default ProductDetailView;

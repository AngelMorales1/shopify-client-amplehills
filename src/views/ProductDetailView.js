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
      content,
      product,
      product: { blocks }
    } = this.props;
    // const { product, content, ourPledge } = model;
    const contentBlocks = get(content, 'items[0].fields.contentBlocks', []);
    const ourPledgeBlocks = get(ourPledge, 'items[0].fields', {});
    const productDetailBlocks = contentBlocks.filter(
      contentBlock =>
        get(contentBlock, 'sys.contentType.sys.id', '') ===
        'blockProductDetails'
    );

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
          {productDetailBlocks.map((productDetailData, i) => {
            if (productDetailData.fields.whatsIncluded) {
              const productDetails = get(
                productDetailData,
                'fields.productDetails',
                []
              );
              return (
                <ProductWhatsIncluded
                  key={`${i}-${get(productDetails, 'fields.sys.id', i)}`}
                  productDetails={productDetails}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default ProductDetailView;

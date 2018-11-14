import React, { Component, Fragment } from 'react';
import get from 'utils/get';
import productHasHero from 'utils/productHasHero';

import BlockSwitch from 'components/BlockSwitch';
import ProductHero from 'components/ProductHero';
import ProductWhatsIncluded from 'components/ProductWhatsIncluded';

class ProductDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const {
      ourPledge,
      product,
      product: { blocks, productHero, whatsIncluded }
    } = this.props;

    return (
      <div className="ProductDetailView">
        <div>
          {productHasHero(product) ? (
            <ProductHero
              product={product}
              ourPledge={ourPledge}
              productHero={productHero}
              z={blocks.length + 2}
              {...this.props}
            />
          ) : null}
          {blocks &&
            blocks.map((block, i) => {
              const isUpperDripOn = get(block, 'fields.upperDrip', false);
              const additionalZIndex = isUpperDripOn ? 1 : 0;

              return (
                <BlockSwitch
                  key={get(block, 'sys.id', i)}
                  block={block}
                  product={product}
                  ourPledge={ourPledge}
                  whatsIncluded={whatsIncluded}
                  z={blocks.length - i + additionalZIndex}
                  {...this.props}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default ProductDetailView;

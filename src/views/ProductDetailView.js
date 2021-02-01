import React, { Component } from 'react';
import get from 'utils/get';
import productHasHero from 'utils/productHasHero';

import BlockSwitch from 'components/BlockSwitch';
import ProductHero from 'components/ProductHero';
import ErrorPage from 'components/ErrorPage';

class ProductDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <ErrorPage />;

    const {
      ourPledge,
      product,
      products,
      product: { blocks, productHero, whatsIncluded }
    } = this.props;

    return (
      <div className="ProductDetailView">
        <div>
          {productHasHero(product) ? (
            <ProductHero
              products={products}
              product={product}
              ourPledge={ourPledge}
              productHero={productHero}
              z={get(this, 'props.product.blocks', []).length + 2}
              {...this.props}
            />
          ) : null}
          {blocks &&
            blocks.map((block, i) => {
              const upperDripIsOn = get(block, 'fields.upperDrip', false);
              const additionalZIndex = upperDripIsOn ? 1 : 0;

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

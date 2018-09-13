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
            <Fragment>
              <ProductHero
                product={product}
                ourPledge={ourPledge}
                productHero={productHero}
                z={blocks.length + 2}
                {...this.props}
              />
              <ProductWhatsIncluded
                product={product}
                ourPledge={ourPledge}
                whatsIncluded={whatsIncluded}
                z={blocks.length + 1}
                {...this.props}
              />
            </Fragment>
          ) : null}
          {blocks &&
            blocks.map((block, i) => (
              <BlockSwitch
                key={get(block, 'sys.id', i)}
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

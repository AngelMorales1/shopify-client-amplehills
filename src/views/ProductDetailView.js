import React, { Component } from 'react';
import get from 'utils/get';
import productHasHero from 'utils/productHasHero';

import BlockSwitch from 'components/BlockSwitch';
import ProductHero from 'components/ProductHero';
import ChooseYourOwnStory from 'components/ChooseYourOwnStory';
import Meta from 'components/Meta';
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
        <Meta
          title={product.seoTitle}
          description={product.seoDescription}
          image={product.seoImage}
        />
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
          {product.handle === 'build-your-own' && (
            <ChooseYourOwnStory {...this.props} />
          )}
          {blocks &&
            blocks.map((block, i) => {
              const upperDripIsOn = get(block, 'upperDrip', false);
              const additionalZIndex = upperDripIsOn ? 1 : 0;

              return (
                <BlockSwitch
                  key={get(block, '_key', i)}
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

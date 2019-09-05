import React from 'react';
import PropTypes from 'prop-types';
import productModel from 'models/productModel';
import ProductGridCard from 'components/ProductGridCard';

const ProductGrid = ({ products, productIsMerchandise }) => {
  return (
    <div className="ProductGrid">
      <div className="flex flex-wrap container-width mx-auto px2 justify-center">
        {products.map(product => {
          if (!product) return null;

          return (
            <ProductGridCard
              key={product.id}
              product={product}
              productIsMerchandise={productIsMerchandise}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(productModel.propTypes),
  merchandise: PropTypes.bool
};

ProductGrid.defaultProps = {
  products: [],
  merchandise: false
};

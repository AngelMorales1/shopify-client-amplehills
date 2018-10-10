import React from 'react';
import PropTypes from 'prop-types';
import productModel from 'models/productModel';
import ProductGridCard from 'components/ProductGridCard';

const ProductGrid = ({ products, merchandise }) => {
  return (
    <div className="ProductGrid">
      <div className="flex flex-wrap container-width mx-auto px2 justify-center">
        {products.map(product => (
          <ProductGridCard
            key={product.id}
            product={product}
            merchandise={merchandise}
          />
        ))}
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

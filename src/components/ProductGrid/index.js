import React from 'react';
import PropTypes from 'prop-types';
import productModel from 'models/productModel';
import ProductGridCard from 'components/ProductGridCard';

const ProductGrid = ({ products }) => {
  return (
    <div className="ProductGrid">
      <div className="flex flex-wrap container-width mx-auto px2">
        {Object.values(products).map(product => (
          <ProductGridCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

ProductGrid.propTypes = {
  products: PropTypes.objectOf(productModel.propTypes)
};

ProductGrid.defaultProps = {
  products: {}
};

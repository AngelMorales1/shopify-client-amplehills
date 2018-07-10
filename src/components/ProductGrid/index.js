import React from 'react';
import PropTypes, { shape } from 'prop-types';
import ProductGridCard from 'components/ProductGridCard';

const ProductGrid = ({ products }) => {
  return (
    <div className="ProductGrid">
      <div className="flex flex-wrap container-width mx-auto px2">
        {products.map(product => (
          <ProductGridCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    shape({
      id: PropTypes.string
    })
  )
};

ProductGrid.defaultProps = {
  products: [{ id: '' }]
};

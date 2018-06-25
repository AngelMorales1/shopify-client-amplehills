import React from 'react';
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

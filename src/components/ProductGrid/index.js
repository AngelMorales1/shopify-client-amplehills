import React from "react";
import ProductGridCard from "components/ProductGridCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="ProductGrid">
      <h2>Products:</h2>
      <div className="clearfix">
        {products.map(product => (
          <ProductGridCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

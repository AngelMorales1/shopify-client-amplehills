import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductGridCard = ({ product }) => {
  return (
    <div className="ProductGridCard col col-4 p1">
      <NavLink exact to={`/products/${product.handle}`} />
    </div>
  );
};

export default ProductGridCard;

import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductGridCard = ({ product }) => {
  return (
    <div className="ProductGridCard col col-4 p1">
      <NavLink exact to={`/products/${product.handle}`}>
        <img alt="" src={product.images[0].src} className="w100" />
        <h3>{product.title}</h3>
        <h4>{product.variants[0].price}</h4>
      </NavLink>
    </div>
  );
};

export default ProductGridCard;

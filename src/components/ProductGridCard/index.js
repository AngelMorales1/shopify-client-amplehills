import React from "react";

const ProductGridCard = ({ product }) => {
  return (
    <div className="ProductGridCard col col-3 p1">
      <img src={product.images[0].src} className="w100" />
      <h3>{product.title}</h3>
      <h4>{product.variants[0].price}</h4>
    </div>
  );
};

export default ProductGridCard;

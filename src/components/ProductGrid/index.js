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
    PropTypes.shape({
      handle: PropTypes.string,
      id: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.string,
      title: PropTypes.string
    })
  )
};

ProductGrid.defaultProps = {
  products: [
    {
      handle: '',
      id: '',
      image: '',
      price: '0.0',
      title: ''
    }
  ]
};

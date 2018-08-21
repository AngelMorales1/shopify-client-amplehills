import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import productModel from 'models/productModel';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import styles from './ProductGridCard.scss';

const ProductGridCard = ({ product }) => {
  return (
    <div className={cx(styles['ProductGridCard'], 'col col-12 md-col-4 p1')}>
      <Link
        className="text-decoration-none"
        exact
        to={`/products/${product.handle}`}
      >
        <div className="flex flex-column items-center">
          <div
            className={cx(
              styles['ProductGridCard__image'],
              'square transition card w100'
            )}
            style={{
              background: `url(${contentfulImgUtil(
                product.gridImage,
                '500'
              )}) no-repeat center`,
              backgroundSize: 'cover'
            }}
          />
          <span className="bold mt2 mb1">{product.title}</span>
          <span>{`$${product.price.toFixed(2)}`}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductGridCard;

ProductGridCard.propTypes = {
  product: productModel.propTypes
};

ProductGridCard.defaultProps = {
  product: productModel.default
};

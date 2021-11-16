import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import productModel from 'models/productModel';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import styles from './ProductGridCard.scss';

const ProductGridCard = ({ product, productIsMerchandise }) => {
  return (
    <div
      className={cx(styles['ProductGridCard'], 'col col-12 p1 relative', {
        'md-col-3': productIsMerchandise,
        'md-col-4': !productIsMerchandise
      })}
    >
      {product.forcePreOrder ? (
        <div
          className={cx(
            {
              [styles['ProductGridCard__mark']]: !productIsMerchandise,
              [styles['ProductGridCard__mark--small']]: productIsMerchandise
            },
            'circle bg-peach absolute z-1 flex items-center justify-center m3 r0 t0'
          )}
        >
          <p
            className={cx(
              styles['ProductGridCard__mark-text'],
              'center carter text-white'
            )}
          >
            Pre-Order!
          </p>
        </div>
      ) : null}
      <Link
        className="text-decoration-none"
        exact
        to={`/products/${product.productHandle}`} // TO-DO Use merged product then product.link
      >
        <div className="flex flex-column items-center">
          <div
            className={cx(
              styles['ProductGridCard__image'],
              'aspect-4-5 transition card w100',
              {
                'aspect-3-4': productIsMerchandise
              }
            )}
            style={{
              background: `url(${
                product.gridImage.src
              }?w=800) no-repeat center`,
              backgroundSize: 'cover'
            }}
          />
          <span className="bold mt2 mb1 center">{product.title}</span>
          <span>{product.displayPrice}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductGridCard;

ProductGridCard.propTypes = {
  product: productModel.propTypes,
  productIsMerchandise: PropTypes.bool
};

ProductGridCard.defaultProps = {
  product: productModel.default,
  productIsMerchandise: false
};

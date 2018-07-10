import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Product from 'constants/types/Product';

import { Button, QuantitySelector } from 'components/base';
import styles from './ProductShoppableCard.scss';

const ProductShoppableCard = ({
  product,
  quantity,
  handleAddProduct,
  handleRemoveProduct
}) => {
  const handleQuantityChange = newQuantity => {
    if (newQuantity > quantity) handleAddProduct(product.handle);
    if (newQuantity < quantity) handleRemoveProduct(product.handle);
  };

  const actionClasses = cx(
    styles['ProductShoppableCard__actions'],
    'relative',
    {
      [styles['ProductShoppableCard__actions--has-quantity']]: quantity
    }
  );

  return (
    <div className={cx(styles['ProductShoppableCard'], 'flex col-12 sm-col-6')}>
      <div
        className="card flex flex-column w100"
        style={{
          background: `url(${product.gridImage}) no-repeat center`,
          backgroundSize: 'cover'
        }}
      >
        <div className="aspect-5-4 w100" />
        <div
          className={cx(
            styles['ProductShoppableCard__info'],
            'flex flex-column justify-between bg-seafoam h100 relative'
          )}
        >
          <div>
            <span className="w100 bold mt2 mb1">{product.title}</span>
            <p className="detail mb3">{product.flavorDescription}</p>
          </div>
          <div className={actionClasses}>
            <QuantitySelector
              className={cx(
                styles['ProductShoppableCard__quantity-selector'],
                'absolute t0 l0 transition'
              )}
              quantity={quantity}
              color="seafoam"
              allowZero={true}
              onChange={newQuantity => handleQuantityChange(newQuantity)}
            />
            <Button
              className={cx(
                styles['ProductShoppableCard__button'],
                'small bg-seafoam absolute t0 l0'
              )}
              variant="primary-small"
              color="white-madison-blue-outline"
              label="+ Add"
              onClick={() => handleAddProduct(product.handle)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductShoppableCard.propTypes = {
  product: Product.propTypes,
  quantity: PropTypes.number,
  handleAddProduct: PropTypes.func,
  handleRemoveProduct: PropTypes.func
};

ProductShoppableCard.defaultProps = {
  product: Product.defaultProps,
  quantity: 0,
  handleAddProduct: () => {},
  handleRemoveProduct: () => {}
};

export default ProductShoppableCard;

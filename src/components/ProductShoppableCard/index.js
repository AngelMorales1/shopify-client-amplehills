import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import productModel from 'models/productModel';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import { Button, QuantitySelector } from 'components/base';
import styles from './ProductShoppableCard.scss';

const ProductShoppableCard = ({
  product,
  quantity,
  handleAddProduct,
  handleRemoveProduct
}) => {
  const ALCOHOL_TAG = 'CYOS';

  const [ageChecker, setAgeChecker] = useState({});

  useEffect(() => {
    product.tags.forEach(tag => {
      if (tag === ALCOHOL_TAG) {
        setAgeChecker({ ...ageChecker, prodContainsAlcohol: true });
        return;
      }
    });
  }, []);

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

  const handleAgeCheckbox = function() {
    setAgeChecker({
      ...ageChecker,
      olderThan21: !ageChecker.olderThan21
    });
  };

  const oldEnough = (allowed, notAllowed) => {
    if (!ageChecker.olderThan21 && ageChecker.prodContainsAlcohol) {
      return allowed;
    } else {
      return notAllowed;
    }
  };

  const ageCheckerValid = function(firstClassName, secondClassName) {
    if (!firstClassName && !secondClassName) {
      return oldEnough(true, false);
    } else {
      return oldEnough(firstClassName, secondClassName);
    }
  };

  return (
    <div className={cx(styles['ProductShoppableCard'], 'flex col-12 sm-col-6')}>
      <div className="card flex flex-column w100">
        <div
          className="aspect-5-4 w100"
          style={{
            background: `url(${contentfulImgUtil(
              product.gridImage,
              '500'
            )}) no-repeat center`,
            backgroundSize: 'cover'
          }}
        />
        <div
          className={cx(
            styles['ProductShoppableCard__info'],
            'flex flex-column justify-between bg-seafoam h100 relative'
          )}
        >
          <div>
            <span className="w100 bold mt2 mb1 block">{product.title}</span>
            <p className="detail mb3">{product.flavorDescription}</p>
          </div>
          {ageChecker.prodContainsAlcohol && (
            <div className={styles.margin}>
              <div>
                <p className="detail bold text-peach">
                  THIS FLAVOR CONTAINS ALCOHOL
                </p>
              </div>
              <div className="flex flex-row items-start">
                <div className={styles.round}>
                  <input
                    type="checkbox"
                    id={product.handle}
                    onChange={handleAgeCheckbox}
                  />
                  <label for={product.handle} />
                </div>
                <p className={cx(styles.textInputAlcohol, 'text-peach ')}>
                  I CERTIFY THAT I AM 21 YEARS OLD OR OLDER
                </p>
              </div>
            </div>
          )}
          {product.available ? (
            <div className={actionClasses}>
              <QuantitySelector
                className={cx(
                  styles['ProductShoppableCard__quantity-selector'],
                  'absolute t0 l0 transition'
                )}
                quantity={quantity}
                color="seafoam"
                allowZero={true}
                variant="byo"
                onChange={newQuantity => handleQuantityChange(newQuantity)}
              />
              <Button
                className={cx(
                  styles['ProductShoppableCard__button'],
                  'small bg-seafoam absolute t0 l0 transition-slide-swap-replace'
                )}
                variant="primary-small"
                color={ageCheckerValid(
                  'white-madison-red-border',
                  'white-madison-blue-border'
                )}
                label={ageCheckerValid('21+ Only', '+ Add')}
                disabled={ageCheckerValid()}
                onClick={() => handleAddProduct(product.handle)}
              />
              <div className="absolute t0 r0 mt1">
                <strong>${product.price.toFixed(2)}</strong>
              </div>
            </div>
          ) : (
            <div className={actionClasses}>
              <Button
                className={cx(
                  styles['ProductShoppableCard__button'],
                  'small bg-seafoam absolute t0 l0'
                )}
                variant="primary-small"
                color="white-madison-blue-border"
                label="Sold Out"
                disabled={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProductShoppableCard.propTypes = {
  product: productModel.propTypes,
  quantity: PropTypes.number,
  handleAddProduct: PropTypes.func,
  handleRemoveProduct: PropTypes.func
};

ProductShoppableCard.defaultProps = {
  product: productModel.default,
  quantity: 0,
  handleAddProduct: () => {},
  handleRemoveProduct: () => {}
};

export default ProductShoppableCard;

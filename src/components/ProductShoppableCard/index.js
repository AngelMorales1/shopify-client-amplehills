import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { Image } from 'components/base';
import styles from './ProductShoppableCard.scss';

class ProductShoppableCard extends Component {
  render() {
    const { product } = this.props;
    console.log(product);
    return (
      <div className={cx(styles['ProductGridCard'], 'col col-12 md-col-6 p1')}>
        <Link
          className="text-decoration-none"
          exact
          to={`/products/${product.handle}`}
        >
          <div className="flex flex-column items-center">
            <Image
              className={cx(
                styles['ProductGridCard__image'],
                'transition card w100'
              )}
              src={product.gridImage}
            />
            <span className="bold mt2 mb1">{product.title}</span>
            <span>{product.price}</span>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProductShoppableCard;

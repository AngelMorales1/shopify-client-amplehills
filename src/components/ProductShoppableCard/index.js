import React, { Component } from 'react';
import cx from 'classnames';

import { Button } from 'components/base';
import styles from './ProductShoppableCard.scss';

class ProductShoppableCard extends Component {
  render() {
    const { product } = this.props;

    return (
      <div className={cx(styles['ProductGridCard'], 'col col-12 md-col-6 p1')}>
        <div
          className="card"
          style={{
            background: `url(${product.gridImage}) no-repeat center`,
            backgroundSize: 'cover'
          }}
        >
          <div className="aspect-5-4 w100" />
          <div className="flex flex-column items-start p2 bg-seafoam">
            <span className="w100 bold mt2 mb1">{product.title}</span>
            <p className="detail mb3">{product.flavorDescription}</p>
            <Button
              className="small bg-seafoam"
              variant="primary-small"
              color="white-madison-blue-outline"
              label="+ Add"
              onClick={this.props.onClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductShoppableCard;

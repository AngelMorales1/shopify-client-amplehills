import React, { Component } from 'react';

import styles from './ProductDetails.scss';

class ProductDetails extends Component {
  render() {
    const colorClass = `ProductDetails--${this.props.data.color}`;

    return (
      <div className={`${styles['ProductDetails']} ${styles[colorClass]}`}>
        <p>THE DETAILS</p>
        {this.props.data.productDetails.map(detail => {
          const { fields } = detail;
          return (
            <div className="ProductDetail" key={detail.sys.id}>
              <p>{fields.title}</p>
              <p>{fields.description}</p>
              <img alt="" src={fields.pintImage.fields.file.url} />
              <p>{fields.details}</p>
              <img alt="" src={fields.detailsImage.fields.file.url} />
              <p>{fields.flavorHighlight}</p>
              <img alt="" src={fields.flavorHighlightImage.fields.file.url} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductDetails;

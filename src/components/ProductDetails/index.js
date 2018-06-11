import React, { Component } from 'react';
import get from 'utils/get';

import styles from './ProductDetails.scss';

class ProductDetails extends Component {
  render() {
    const { data } = this.props;
    const details = get(data, 'productDetails', []);

    const colorClass = `ProductDetails--${get(data, 'color', 'Blue')}`;

    return (
      <div className={`${styles['ProductDetails']} ${styles[colorClass]}`}>
        <p>THE DETAILS</p>
        {details.map(detail => {
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

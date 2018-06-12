import React, { Component } from 'react';
import get from 'utils/get';

import { Button } from 'components/base';
import styles from './ProductDetails.scss';

class ProductDetails extends Component {
  render() {
    const { data } = this.props;
    const details = get(data, 'productDetails', []);

    const colorClass = `ProductDetails--${get(data, 'color', 'Blue')}`;

    return (
      <div className={`${styles['ProductDetails']} ${styles[colorClass]}`}>
        <h2 className="block-headline">The Details</h2>
        {details.map(detail => {
          const { fields } = detail;
          return (
            <div className="ProductDetail" key={detail.sys.id}>
              <Button label={fields.title} />
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

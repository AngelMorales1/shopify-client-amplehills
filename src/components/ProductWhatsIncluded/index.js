import React, { Component } from 'react';
import cx from 'classnames';
import get from 'utils/get';

import styles from './ProductWhatsIncluded.scss';
import { Image } from 'components/base';

class ProductWhatsIncluded extends Component {
  render() {
    const { productDetails } = this.props;
    const colorClass = `ProductWhatsIncluded--${get(
      productDetails,
      'backgroundColor',
      'Light-Pink'
    )}`;
    return (
      <div className={cx(styles['ProductWhatsIncluded'], styles[colorClass])}>
        <h2 className="block-headline m3 nowrap">What's included</h2>
        <div className="flex flex-column">
          {productDetails.map((flavor, i) => {
            const flavorTitle = get(flavor, 'fields.title', '');
            return (
              <div
                key={`${i}-${get(flavor, 'sys.id', i)}`}
                className={cx(
                  styles['ProductWhatsIncluded__flavor-container'],
                  'flex items-center my2'
                )}
              >
                <Image
                  alt={`${flavorTitle} image`}
                  src={get(flavor, 'fields.pintImage.fields.file.url', '')}
                  className={cx(
                    styles['ProductWhatsIncluded__image'],
                    'mr3 col-2'
                  )}
                />
                <div>
                  <h3 className="block-subheadline bold nowrap">{`1x ${flavorTitle}`}</h3>
                  <p className="description nowrap">
                    {get(flavor, 'fields.oneLineDescription', '')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductWhatsIncluded;

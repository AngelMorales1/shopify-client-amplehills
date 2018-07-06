import React from 'react';
import cx from 'classnames';
import get from 'utils/get';

import styles from './ProductWhatsIncluded.scss';
import { Image } from 'components/base';

const ProductWhatsIncluded = ({ block, z, products, ...props }) => {
  const fields = get(block, 'fields', {});
  const colorClass = `ProductWhatsIncluded--${get(
    fields,
    'backgroundColor',
    'light-pink'
  )}`;

  const includedItems = get(fields, 'products', []);

  return (
    <div
      className={cx(
        styles['ProductWhatsIncluded'],
        styles[colorClass],
        'flex justify-between drip'
      )}
      style={{ zIndex: z }}
    >
      <h2 className="block-headline m3 nowrap">What's included</h2>
      <div className="flex flex-column col-12 md-col-4">
        {includedItems.map(product => {
          const handle = get(product, 'fields.productHandle', '');
          const productInfo = get(products, handle, {});

          return (
            <div
              key={productInfo.id}
              className={cx(
                styles['ProductWhatsIncluded__flavor-container'],
                'flex items-center my2 col-12'
              )}
            >
              <div className="mr3 col-2">
                <Image
                  alt={`${productInfo.title} image`}
                  src={productInfo.pintImage}
                />
              </div>
              <div className="col-10">
                <h3 className="description-title bold nowrap mb2">{`1x ${
                  productInfo.title
                }`}</h3>
                <p className="tout">{productInfo.flavorDescription}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductWhatsIncluded;

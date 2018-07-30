import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import productModel from 'models/productModel';

import styles from './ProductWhatsIncluded.scss';
import { Image } from 'components/base';

const ProductWhatsIncluded = ({ block, z, products }) => {
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
      <h2 className="block-headline m3 nowrap">What&rsquo;s included</h2>
      <div className="flex flex-column col-12 md-col-4">
        {includedItems.map(includedItem => {
          const handle = get(includedItem, 'fields.productHandle', '');
          const product = get(products, handle, {});

          return (
            <div
              key={product.id}
              className={cx(
                styles['ProductWhatsIncluded__flavor-container'],
                'flex items-center my2 col-12'
              )}
            >
              <div className="mr3 col-2">
                <Image alt={`${product.title} image`} src={product.pintImage} />
              </div>
              <div className="col-10">
                <h3 className="description-title bold nowrap mb2">{`1x ${
                  product.title
                }`}</h3>
                <p className="block-subheadline">{product.flavorDescription}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductWhatsIncluded;

ProductWhatsIncluded.propTypes = {
  block: PropTypes.shape({
    fields: PropTypes.shape({
      backgroundColor: PropTypes.string,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.shape({
            productHandle: PropTypes.string
          })
        })
      )
    })
  }),
  z: PropTypes.number,
  products: PropTypes.objectOf(productModel.propTypes)
};

ProductWhatsIncluded.defaultProps = {
  block: {
    fields: {
      backgroundColor: 'light-pink',
      products: [
        {
          fields: {
            productHandle: ''
          }
        }
      ]
    }
  },
  z: 1,
  products: {}
};

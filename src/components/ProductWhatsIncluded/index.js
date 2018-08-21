import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import productModel from 'models/productModel';
import imageModel from 'models/imageModel';
import contentfulImgUtil from 'utils/contentfulImgUtil';

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
        'flex justify-between drip relative'
      )}
      style={{ zIndex: z }}
    >
      <h2
        className={cx(
          styles['ProductWhatsIncluded__block-title'],
          'block-headline my3 nowrap col-12 md-col-6 center'
        )}
      >
        What&rsquo;s included
      </h2>
      <div className="flex flex-column col-12 md-col-6">
        {includedItems.map(includedItem => {
          const handle = get(includedItem, 'fields.productHandle', '');
          const product = get(products, handle, {});

          return (
            <div
              key={handle}
              className={cx(
                styles['ProductWhatsIncluded__flavor-container'],
                'flex items-start my2 col-12'
              )}
            >
              <div className="mr3 col-2">
                <Image
                  alt={`${product.title} image`}
                  src={contentfulImgUtil(product.pintImage, '500', 'png')}
                />
              </div>
              <div className="col-10">
                <h3 className="description-title bold mb2">{`1x ${
                  product.title
                }`}</h3>
                <p className="block-subheadline">{product.flavorDescription}</p>
              </div>
            </div>
          );
        })}
      </div>
      {fields.illustration ? (
        <div
          className={cx(
            styles['ProductWhatsIncluded__illustration'],
            'col-12 md-col-6 center'
          )}
        >
          <Image
            className="col-5 md-col-4 mt3"
            alt="what&rsquo;s included image"
            src={contentfulImgUtil(
              get(fields, 'illustration.fields.file.url', ''),
              '600',
              'png'
            )}
          />
        </div>
      ) : null}
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
      ),
      illustration: imageModel.propTypes
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
      ],
      illustration: null
    }
  },
  z: 1,
  products: {}
};

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import productModel from 'models/productModel';
import imageModel from 'models/imageModel';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import styles from './ProductWhatsIncluded.scss';
import { Image } from 'components/base';

const ProductWhatsIncluded = ({
  block,
  z,
  products,
  whatsIncluded: {
    whatsIncludedDrip,
    whatsIncludedIllustration,
    whatsIncludedProducts
  }, setRef 
}) => {
  const fields = get(block, 'fields', {});
  const colorClass = `ProductWhatsIncluded--${get(
    fields,
    'backgroundColor',
    'light-pink'
  )}`;

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      className={cx(
        styles['ProductWhatsIncluded'],
        styles[colorClass],
        'flex justify-between relative',
        { drip: whatsIncludedDrip }
      )}
      style={{ zIndex: z }}
    >
      <div className="col-12 md-col-6">
        <h2 className="block-headline my3 nowrap center flex flex-column items-center justify-center">
          What&rsquo;s included
        </h2>
        {whatsIncludedIllustration ? (
          <div className="center xs-hide sm-hide mx-auto">
            <Image
              className="col-4 mt3"
              alt="what&rsquo;s included image"
              src={contentfulImgUtil(whatsIncludedIllustration, '600', 'png')}
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-column col-12 md-col-6">
        {whatsIncludedProducts.map(includedItem => {
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
      {whatsIncludedIllustration ? (
        <div
          className={cx(
            styles['ProductWhatsIncluded__illustration'],
            'col-12 md-col-6 center lg-hide md-hide'
          )}
        >
          <Image
            className="col-5 md-col-4 mt3"
            alt="what&rsquo;s included image"
            src={contentfulImgUtil(whatsIncludedIllustration, '600', 'png')}
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
  whatsIncluded: PropTypes.shape({
    whatsIncludedDrip: PropTypes.bool,
    whatsIncludedIllustration: PropTypes.string,
    whatsIncludedProducts: PropTypes.array
  }),
  z: PropTypes.number,
  products: PropTypes.objectOf(productModel.propTypes),
  setRef: PropTypes.func
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
  whatsIncluded: {
    whatsIncludedDrip: false,
    whatsIncludedIllustration: '',
    whatsIncludedProducts: []
  },
  z: 1,
  products: {},
  setRef: () => {}
};

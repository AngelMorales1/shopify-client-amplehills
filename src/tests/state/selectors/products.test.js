import React from 'react';
import { shallow } from 'enzyme';

import products from 'state/selectors/products';

it('renders without data', () => {
  const shopifyProducts = [
    {
      handle: 'test-product',
      variants: [
        {
          title: 'test-variant',
          available: true,
          price: 19.99,
          id: '9999'
        }
      ]
    }
  ];

  const contentProducts = {
    items: [
      {
        fields: {
          productTitle: 'Test Product',
          productHandle: 'test-product',
          flavorDescription: 'Very testy',
          image: { fields: { file: { url: 'test.jpg' } } },
          pintImage: { fields: { file: { url: 'pint.jpg' } } },
          contentBlocks: ['test-block']
        }
      }
    ]
  };

  const mergedProducts = {
    'test-product': {
      title: 'Test Product',
      id: '9999',
      handle: 'test-product',
      available: true,
      flavorDescription: 'Very testy',
      price: 19.99,
      variants: [
        {
          title: 'test-variant',
          available: true,
          price: 19.99,
          id: '9999'
        }
      ],
      gridImage: 'test.jpg',
      pintImage: 'pint.jpg',
      blocks: ['test-block']
    }
  };

  expect(products.resultFunc(shopifyProducts, contentProducts)).toEqual(
    mergedProducts
  );
});

// return products.reduce((mergedProducts, product) => {
//   const title = get(product, 'fields.productTitle', '');
//   const handle = get(product, 'fields.productHandle', '');
//   const flavorDescription = get(product, 'fields.flavorDescription', '');
//   const gridImage = get(product, 'fields.image.fields.file.url', '');
//   const pintImage = get(product, 'fields.pintImage.fields.file.url', '');
//   const blocks = get(product, 'fields.contentBlocks', []);
//
//   const shopifyProduct = shopifyProducts[handle];
//   const available = get(shopifyProduct, 'variants[0].available', false);
//   const price = parseFloat(get(shopifyProduct, 'variants[0].price', 0.0));
//   const id = get(shopifyProduct, 'variants[0].id', '');
//   const variants = get(shopifyProduct, 'variants', []).map(variant => {
//     const { id, price, title, available } = variant;
//     return { id, price, title, available };
//   });
//
//   mergedProducts[handle] = {
//     title,
//     id,
//     handle,
//     available,
//     flavorDescription,
//     price,
//     variants,
//     gridImage,
//     pintImage,
//     blocks
//   };
//
//   return mergedProducts;
// }, {});

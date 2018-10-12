export const shopifyProducts = {
  'test-product': {
    available: true,
    handle: 'test-product',
    id: '9999',
    price: 19.99,
    variants: [
      {
        available: true,
        id: '9999',
        price: 19.99
      }
    ]
  },
  'test-product-2': {
    available: true,
    handle: 'test-product-2',
    id: '9999',
    price: 19.99,
    variants: [
      {
        available: true,
        id: '9999',
        price: 19.99
      }
    ]
  }
};

export const contentProducts = {
  'test-product': {
    productHandle: 'test-product',
    productTitle: 'test product',
    cartDetails: '1x Test Flavor',
    description: 'This is a test description',
    flavorDescription: 'Very testy',
    image: { fields: { file: { url: 'test.jpg' } } },
    pintImage: { fields: { file: { url: 'pint.jpg' } } },
    contentBlocks: ['test-block'],
    subItems: [
      { fields: { productHandle: 'test-product-2' } },
      { fields: { productHandle: 'test-product-3' } }
    ]
  },
  'test-product-2': {
    productHandle: 'test-product-2',
    productTitle: 'test product2',
    cartDetails: '1x Test Flavor',
    description: 'This is a test description',
    flavorDescription: 'Very testy',
    image: { fields: { file: { url: 'test.jpg' } } },
    pintImage: { fields: { file: { url: 'pint.jpg' } } },
    contentBlocks: ['test-block'],
    subItems: [
      { fields: { productHandle: 'test-product-2' } },
      { fields: { productHandle: 'test-product-3' } }
    ]
  },
  'test-product-3': {
    productHandle: 'test-product-3',
    productTitle: 'test product3',
    cartDetails: '1x Test Flavor',
    description: 'This is a test description',
    flavorDescription: 'Very testy',
    image: { fields: { file: { url: 'test.jpg' } } },
    pintImage: { fields: { file: { url: 'pint.jpg' } } },
    contentBlocks: ['test-block'],
    subItems: [
      { fields: { productHandle: 'test-product-2' } },
      { fields: { productHandle: 'test-product-3' } }
    ]
  }
};

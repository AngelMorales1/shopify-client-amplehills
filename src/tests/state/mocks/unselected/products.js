export const shopifyProducts = {
  'test-product': {
    handle: 'test-product',
    available: true,
    price: 19.99,
    id: '9999',
    variants: [
      {
        available: true,
        price: 19.99,
        id: '9999'
      }
    ]
  },
  'test-product-2': {
    handle: 'test-product-2',
    available: false,
    price: 19.99,
    id: '9999',
    variants: [
      {
        available: false,
        price: 19.99,
        id: '9999'
      }
    ]
  },
  'test-product-3': {
    handle: 'test-product-3',
    available: true,
    price: 19.99,
    id: '9999',
    variants: [
      {
        available: true,
        price: 19.99,
        id: '9999'
      }
    ]
  }
};

export const contentProducts = {
  items: [
    {
      fields: {
        productTitle: 'Test Product',
        productHandle: 'test-product',
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
    },
    {
      fields: {
        productTitle: 'Test Product 2',
        productHandle: 'test-product-2',
        cartDetails: '1x Test Flavor',
        description: 'This is a test description',
        flavorDescription: 'Very testy',
        image: { fields: { file: { url: 'test.jpg' } } },
        pintImage: { fields: { file: { url: 'pint.jpg' } } },
        contentBlocks: ['test-block'],
        subItems: []
      }
    },
    {
      fields: {
        productTitle: 'Test Product 3',
        productHandle: 'test-product-3',
        cartDetails: '1x Test Flavor',
        description: 'This is a test description',
        flavorDescription: 'Very testy',
        image: { fields: { file: { url: 'test.jpg' } } },
        pintImage: { fields: { file: { url: 'pint.jpg' } } },
        contentBlocks: ['test-block'],
        subItems: []
      }
    }
  ]
};

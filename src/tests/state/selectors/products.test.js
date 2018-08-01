import products from 'state/selectors/products';

it('products selector works as intended', () => {
  const shopifyProducts = {
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

  const contentProducts = {
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

  const mergedProducts = {
    'test-product': {
      title: 'Test Product',
      id: '9999',
      handle: 'test-product',
      available: true,
      flavorDescription: 'Very testy',
      cartDetails: '1x Test Flavor',
      description: 'This is a test description',
      price: 19.99,
      variants: [
        {
          available: true,
          price: 19.99,
          id: '9999'
        }
      ],
      gridImage: 'test.jpg',
      pintImage: 'pint.jpg',
      blocks: ['test-block'],
      subItems: ['test-product-2', 'test-product-3'],
      subItemsAvailable: false
    },
    'test-product-2': {
      title: 'Test Product 2',
      id: '9999',
      handle: 'test-product-2',
      available: false,
      flavorDescription: 'Very testy',
      cartDetails: '1x Test Flavor',
      description: 'This is a test description',
      price: 19.99,
      variants: [
        {
          available: false,
          price: 19.99,
          id: '9999'
        }
      ],
      gridImage: 'test.jpg',
      pintImage: 'pint.jpg',
      blocks: ['test-block'],
      subItems: [],
      subItemsAvailable: true
    },
    'test-product-3': {
      title: 'Test Product 3',
      id: '9999',
      handle: 'test-product-3',
      available: true,
      flavorDescription: 'Very testy',
      cartDetails: '1x Test Flavor',
      description: 'This is a test description',
      price: 19.99,
      variants: [
        {
          available: true,
          price: 19.99,
          id: '9999'
        }
      ],
      gridImage: 'test.jpg',
      pintImage: 'pint.jpg',
      blocks: ['test-block'],
      subItems: [],
      subItemsAvailable: true
    }
  };

  expect(products.resultFunc(shopifyProducts, contentProducts)).toEqual(
    mergedProducts
  );
});

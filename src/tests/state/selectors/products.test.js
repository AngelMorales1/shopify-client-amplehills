import products from 'state/selectors/products';

it('products selector works as intended', () => {
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

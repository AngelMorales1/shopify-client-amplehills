import getProductCards from 'state/selectors/getProductCards';

it('getProductCards selector works as intended', () => {
  const shopify = [
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

  const contentful = {
    items: [
      {
        fields: {
          products: [
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
        }
      }
    ]
  };

  const mergedProducts = [
    {
      handle: 'test-product',
      id: '9999',
      image: 'test.jpg',
      price: 19.99,
      title: 'Test Product'
    }
  ];

  expect(getProductCards.resultFunc(shopify, contentful)).toEqual(
    mergedProducts
  );
});

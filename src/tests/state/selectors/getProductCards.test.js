import getProductCards from 'state/selectors/getProductCards';

it('getProductCards selector works as intended', () => {
  const shopify = {
    'test-product': {
      handle: 'test-product',
      variants: [
        {
          available: true,
          price: 19.99,
          id: '9999'
        }
      ]
    }
  };

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

  const mergedProducts = {
    'Test Product': {
      handle: 'test-product',
      image: 'test.jpg',
      title: 'Test Product',
      variants: [
        {
          available: true,
          id: '9999',
          price: 19.99
        }
      ]
    }
  };

  expect(getProductCards.resultFunc(shopify, contentful)).toEqual(
    mergedProducts
  );
});

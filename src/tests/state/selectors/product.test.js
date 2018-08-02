import product from 'state/selectors/product';

it('product selector works as intended', () => {
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

  const mergedProduct = {
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
  };
  const handle = 'test-product-3';

  expect(product.resultFunc(shopifyProducts, handle)).toEqual(mergedProduct);
});

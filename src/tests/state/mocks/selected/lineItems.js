export default [
  {
    id: '0001',
    title: 'Test Product',
    quantity: 2,
    price: '39.98',
    attributes: [
      {
        key: 'Item 1',
        value: 'test-product-2'
      },
      {
        key: 'Item 2',
        value: 'test-product-2'
      },
      {
        key: 'Item 3',
        value: 'test-product-3'
      }
    ],
    subItems: [
      {
        handle: 'test-product-2',
        quantity: 2
      },
      {
        handle: 'test-product-3',
        quantity: 1
      }
    ],
    variant: {
      id: '9999',
      price: 19.99
    },
    productId: '9999'
  }
];

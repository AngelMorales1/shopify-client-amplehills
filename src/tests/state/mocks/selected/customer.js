export default {
  id: '0001',
  email: 'user@sanctuary.computer',
  firstName: 'Test',
  lastName: 'User',
  phone: '8881234567',
  accessToken: '9999',
  orders: [
    {
      receipt: 'http://amplehills.com',
      id: '1111',
      orderNumber: 'AH-1111',
      date: '2018-01-01 00:00',
      totalPrice: '39.98',
      items: [
        {
          id: '0001',
          title: 'Test Product',
          productId: '9999',
          quantity: 2,
          price: '39.98',
          cartAttributes: ['2x Test Product 2', '1x Test Product 3'],
          product: {},
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
          variant: {
            id: '9999',
            price: 19.99
          }
        }
      ]
    }
  ]
};

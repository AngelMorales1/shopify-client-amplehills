export default {
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

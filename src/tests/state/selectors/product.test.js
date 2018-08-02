import selectedProducts from 'tests/state/mocks/selected/products';
import selectedProduct from 'tests/state/mocks/selected/product';
import product from 'state/selectors/product';

it('product selector works as intended', () => {
  const handle = 'test-product';

  expect(product.resultFunc(selectedProducts, handle)).toEqual(selectedProduct);
});

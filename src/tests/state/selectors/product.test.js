import {
  shopifyProducts,
  contentProducts
} from 'tests/state/mocks/unselected/products';
import selectedProduct from 'tests/state/mocks/selected/product';
import products from 'state/selectors/products';
import product from 'state/selectors/product';

it('product selector works as intended', () => {
  const handle = 'test-product';
  const selectedProducts = products.resultFunc(
    shopifyProducts,
    contentProducts
  );

  expect(product.resultFunc(selectedProducts, handle)).toEqual(selectedProduct);
});

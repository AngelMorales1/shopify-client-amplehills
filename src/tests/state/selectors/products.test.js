import {
  shopifyProducts,
  contentProducts
} from 'tests/state/mocks/unselected/products';
import selectedProducts from 'tests/state/mocks/selected/products';
import products from 'state/selectors/products';

it('products selector works as intended', () => {
  expect(products.resultFunc(shopifyProducts, contentProducts)).toEqual(
    selectedProducts
  );
});

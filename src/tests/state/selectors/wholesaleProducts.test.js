import {
  shopifyProducts,
  contentProducts
} from 'tests/state/mocks/unselected/wholesaleProducts';
import selectedwholesaleProducts from 'tests/state/mocks/selected/wholesaleProducts';
import wholesaleProducts from 'state/selectors/wholesaleProducts';

it('wholesaleProducts selector works as intended', () => {
  expect(
    wholesaleProducts.resultFunc(shopifyProducts, contentProducts)
  ).toEqual(selectedwholesaleProducts);
});

import selectedLineItems from 'tests/state/mocks/selected/lineItems';
import lineItems from 'state/selectors/lineItems';
import unselectedCheckout from 'tests/state/mocks/unselected/checkout';
import checkout from 'state/selectors/checkout';
import {
  shopifyProducts as unselectedShopifyProducts,
  contentProducts as unselectedContentfulProducts
} from 'tests/state/mocks/unselected/products';
import products from 'state/selectors/products';

it('lineItems selector works as intended', () => {
  const selectedCheckout = checkout.resultFunc(unselectedCheckout);
  const allProducts = products.resultFunc(
    unselectedShopifyProducts,
    unselectedContentfulProducts
  );

  expect(lineItems.resultFunc(selectedCheckout, allProducts)).toEqual(
    selectedLineItems
  );
});

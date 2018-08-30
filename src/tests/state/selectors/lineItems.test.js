import unselectedCheckout from 'tests/state/mocks/unselected/checkout';
import selectedLineItems from 'tests/state/mocks/selected/lineItems';
import checkout from 'state/selectors/checkout';
import lineItems from 'state/selectors/lineItems';

it('lineItems selector works as intended', () => {
  const selectedCheckout = checkout.resultFunc(unselectedCheckout);

  expect(lineItems.resultFunc(selectedCheckout)).toEqual(selectedLineItems);
});

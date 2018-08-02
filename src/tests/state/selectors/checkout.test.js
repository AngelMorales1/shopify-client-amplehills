import unselectedCheckout from 'tests/state/mocks/unselected/checkout';
import selectedCheckout from 'tests/state/mocks/selected/checkout';
import checkout from 'state/selectors/checkout';

it('checkout selector works as intended', () => {
  expect(checkout.resultFunc(unselectedCheckout)).toEqual(selectedCheckout);
});

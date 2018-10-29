import selectedLineItems from 'tests/state/mocks/selected/lineItems';
import lineItems from 'state/selectors/lineItems';
import unselectedCheckout from 'tests/state/mocks/unselected/checkout';
import checkout from 'state/selectors/checkout';
import unselectedProducts from 'tests/state/mocks/unselected/products';
import products from 'state/selectors/products';
import unselectedEvents from 'tests/state/mocks/unselected/events';
import events from 'state/selectors/events';
import unselectedPartyDeposit from 'tests/state/mocks/unselected/partyDeposit';
import partyDeposit from 'state/selectors/partyDeposit';

it('lineItems selector works as intended', () => {
  const selectedCheckout = checkout.resultFunc(unselectedCheckout);
  const allProducts = {
    products: products.resultFunc(unselectedProducts),
    events: events.resultFunc(unselectedEvents),
    partyDeposit: partyDeposit.resultFunc(unselectedPartyDeposit)
  };

  expect(lineItems.resultFunc(selectedCheckout, allProducts)).toEqual(
    selectedLineItems
  );
});

import unselectedCustomer from 'tests/state/mocks/unselected/customer';
import selectedAddresses from 'tests/state/mocks/selected/addresses';
import addresses from 'state/selectors/addresses';

it('addresses selector works as intended', () => {
  expect(addresses.resultFunc(unselectedCustomer.addresses.edges)).toEqual(
    selectedAddresses
  );
});

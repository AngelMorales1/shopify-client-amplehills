import unselectedCustomer from 'tests/state/mocks/unselected/customer';
import selectedProducts from 'tests/state/mocks/selected/products';
import selectedCustomer from 'tests/state/mocks/selected/customer';
import customer from 'state/selectors/customer';

it('customer selector works as intended', () => {
  expect(customer.resultFunc(unselectedCustomer, selectedProducts)).toEqual(
    selectedCustomer
  );
});

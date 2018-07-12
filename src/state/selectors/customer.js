import { createSelector } from 'reselect';

import { deriveAddresses } from 'state/selectors/addresses.js';

import get from 'utils/get';

export default createSelector(
  state => get(state, 'customer'),
  customer => {
    if (!get(customer, 'data.customer.id', '')) return { id: '' };
    const id = get(customer, 'data.customer.id', '');
    const email = get(customer, 'data.customer.email', '');
    const firstName = get(customer, 'data.customer.firstName', '');
    const lastName = get(customer, 'data.customer.lastName', '');
    const phone = get(customer, 'data.customer.phone', '');

    const orders = get(customer, 'data.customer.orders.edges', []).map(
      order => order
    );
    const addresses = deriveAddresses(
      get(customer, 'data.customer.addresses.edges', [])
    );

    const accessToken = get(customer, 'accessToken', '');

    return {
      accessToken,
      id,
      email,
      firstName,
      lastName,
      phone,
      addresses,
      orders
    };
  }
);

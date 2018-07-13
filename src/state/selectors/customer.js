import { createSelector } from 'reselect';

import { deriveAddresses } from 'state/selectors/addresses.js';

import get from 'utils/get';

export default createSelector(
  state => get(state, 'customer'),
  customer => {
    if (!get(customer, 'id', '')) return { id: '' };
    const id = get(customer, 'id', '');
    const email = get(customer, 'email', '');
    const firstName = get(customer, 'firstName', '');
    const lastName = get(customer, 'lastName', '');
    const phone = get(customer, 'phone', '');

    const orders = get(customer, 'orders.edges', []).map(order => order);
    const addresses = deriveAddresses(get(customer, 'addresses.edges', []));

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

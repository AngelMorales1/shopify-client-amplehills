import { createSelector } from 'reselect';

import { deriveAddresses } from 'state/selectors/addresses.js';
import { deriveLineItems } from 'state/selectors/lineItems.js';

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

    const addresses = deriveAddresses(get(customer, 'addresses.edges', []));
    const accessToken = get(customer, 'accessToken', '');

    const orders = get(customer, 'orders.edges', []).map(order => {
      const orderNode = get(order, 'node', {});
      const receipt = get(orderNode, 'customerUrl', '');
      const id = get(orderNode, 'id', '');
      const orderNumber = get(orderNode, 'orderNumber', '');
      const date = get(orderNode, 'processedAt', '');
      const totalPrice = get(orderNode, 'totalPrice', '0.00');

      const lineItems = get(orderNode, 'lineItems.edges', []);
      const items = deriveLineItems({ lineItems });

      return {
        id,
        orderNumber,
        receipt,
        totalPrice,
        date,
        items
      };
    });

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

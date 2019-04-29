import { createSelector } from 'reselect';

import { deriveLineItems } from 'state/selectors/lineItems.js';
import products from 'state/selectors/product.js';

import get from 'utils/get';

const emptyCustomer = { id: '' };

export default createSelector(
  state => get(state, 'customer'),
  state => products(state),
  (customer, products) => {
    if (!get(customer, 'id', '')) return emptyCustomer;
    const id = get(customer, 'id', '');
    const email = get(customer, 'email', '');
    const firstName = get(customer, 'firstName', '');
    const lastName = get(customer, 'lastName', '');
    const phone = get(customer, 'phone', '');

    const accessToken = get(customer, 'accessToken', '');

    const orders = get(customer, 'orders.edges', []).map(order => {
      const orderNode = get(order, 'node', {});
      const receipt = get(orderNode, 'customerUrl', '');
      const id = get(orderNode, 'id', '');
      const orderNumber = get(orderNode, 'orderNumber', '');
      const date = get(orderNode, 'processedAt', '');
      const totalPrice = get(orderNode, 'totalPrice', '0.00');

      const lineItems = get(orderNode, 'lineItems.edges', []);
      const items = deriveLineItems({ lineItems }, products);

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
      orders
    };
  }
);

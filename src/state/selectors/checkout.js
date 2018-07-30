import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'session.checkout', {}),
  checkout => {
    const id = get(checkout, 'id', '');
    const lineItems = get(checkout, 'lineItems.edges', []);
    const completedAt = get(checkout, 'completedAt', '');
    const currencyCode = get(checkout, 'currencyCode', 'USD');
    const note = get(checkout, 'note', '');
    const subtotalPrice = get(checkout, 'subtotalPrice', '');
    const totalPrice = get(checkout, 'totalPrice', '');

    return {
      id,
      lineItems,
      completedAt,
      currencyCode,
      note,
      subtotalPrice,
      totalPrice
    };
  }
);

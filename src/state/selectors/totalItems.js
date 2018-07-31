import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'session.checkout.lineItems.edges', []),
  items =>
    items.reduce((total, node) => {
      const item = get(node, 'node', {});
      return total + item.quantity;
    }, 0)
);

import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'session.checkout.lineItems', { lineItems: [] }),
  items => items.reduce((total, item) => total + item.quantity, 0)
);

import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'session.checkout', {}),
  checkout => {
    const lineItems = get(checkout, 'lineItems.edges', []);
    console.log('CHECKOUT', {
      ...checkout,
      lineItems
    });
    return {
      ...checkout,
      lineItems
    };
  }
);

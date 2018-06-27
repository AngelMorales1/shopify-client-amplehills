import { createSelector } from 'reselect';
import get from 'utils/get';
import products from 'state/selectors/products';

export default createSelector(
  state => products(state),
  state => get(state, 'product.handle', ''),
  (products, handle) => products[handle]
);

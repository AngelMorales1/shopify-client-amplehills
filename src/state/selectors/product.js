import { createSelector } from 'reselect';
import get from 'utils/get';
import products from 'state/selectors/products';

export default createSelector(
  state => products(state),
  (state, props) => get(props, 'match.params.productHandle', ''),
  (products, handle) => products[handle]
);
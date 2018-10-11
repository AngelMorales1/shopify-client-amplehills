import { createSelector } from 'reselect';
import get from 'utils/get';
import allMerchandise from 'state/selectors/allMerchandise';

export default createSelector(
  state => allMerchandise(state),
  (state, props) => {
    return get(props, 'match.params.merchHandle', '');
  },
  (products, handle) => products[handle]
);

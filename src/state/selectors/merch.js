import { createSelector } from 'reselect';
import get from 'utils/get';
import merchandises from 'state/selectors/merchandises';

export default createSelector(
  state => merchandises(state),
  (state, props) => get(props, 'match.params.merchHandle', ''),
  (products, handle) => products[handle]
);

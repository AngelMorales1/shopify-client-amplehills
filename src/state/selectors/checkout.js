import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'session.checkout', {}),
  checkout => {
    console.log('dddd', checkout);
  }
);

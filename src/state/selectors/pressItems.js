import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'press', {}),
  latestPressItems => get(latestPressItems, 'pressItems.items', {})
);

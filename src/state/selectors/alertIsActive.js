import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'applicationUI.globalSettings.items[0].fields.alert', {}),
  alert => !!get(alert, 'fields', {}).alertCopy
);

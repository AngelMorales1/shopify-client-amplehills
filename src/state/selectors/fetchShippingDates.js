import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(
      state,
      'applicationUI.globalSettings.items[0].fields.shippingDates',
      ''
    ),
  shippingDates => shippingDates.split(',')
);

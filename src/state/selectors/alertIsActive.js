import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(
      state,
      'applicationUI.globalSettings.items[0].fields.alertBanner.simpleFragments',
      {}
    ),
  alert => {
    const simpleFragmentsValue = Object.values(alert);

    return !!get(simpleFragmentsValue[0], 'alertCopy', '');
  }
);

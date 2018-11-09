import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(
      state,
      'applicationUI.globalSettings.items[0].fields.cakeFillings.simpleFragments',
      {}
    ),
  cakeFillings => {
    return Object.keys(cakeFillings).reduce((fillings, id) => {
      const cakeFilling = cakeFillings[id];
      const title = get(cakeFilling, 'title', '');

      const filling = {
        id,
        title
      };

      fillings.push(filling);

      return fillings;
    }, []);
  }
);

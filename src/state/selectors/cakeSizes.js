import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(
      state,
      'applicationUI.globalSettings.items[0].fields.cakeSize.simpleFragments',
      {}
    ),
  cakeSizes => {
    return Object.keys(cakeSizes).reduce((sizes, id) => {
      const cakeSize = cakeSizes[id];
      const description = get(cakeSize, 'description', '');
      const variantTitle = get(cakeSize, 'variantTitle', '');

      sizes[variantTitle] = { id, description };

      return sizes;
    }, {});
  }
);

import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(
      state,
      'applicationUI.globalSettings.items[0].fields.cakeAddOns.simpleFragments',
      {}
    ),
  cakeAddOns => {
    return Object.keys(cakeAddOns).reduce((addOns, id) => {
      const product = cakeAddOns[id];

      const price = parseFloat(product.price || '0.0').toFixed(2);
      const title = product.title || '';
      const unit = product.unit || '';

      const addOn = {
        id,
        price,
        unit,
        title
      };

      addOns.push(addOn);

      return addOns;
    }, []);
  }
);

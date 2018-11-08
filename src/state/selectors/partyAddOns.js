import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(
      state,
      'applicationUI.globalSettings.items[0].fields.partyAddOns.simpleFragments',
      {}
    ),
  partyAddOns => {
    return Object.keys(partyAddOns).reduce((handlizedProducts, productKey) => {
      const product = partyAddOns[productKey];
      const id = productKey;

      const price = parseFloat(product.price || '0.0').toFixed(2);
      const title = product.title || '';
      const unit = product.unit || '';
      const moreInfoText = product.moreInfoText || '';

      const handlizedProduct = {
        id,
        price,
        unit,
        title,
        moreInfoText
      };

      handlizedProducts.push(handlizedProduct);

      return handlizedProducts;
    }, []);
  }
);

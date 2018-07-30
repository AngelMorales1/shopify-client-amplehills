import { createSelector } from 'reselect';
import get from 'utils/get';

import products from 'state/selectors/products';

export default createSelector(
  state => products(state),
  state => get(state, 'products.productLanding', []),
  (products, landing) => {
    const content = get(landing, 'items[0]', {});
    const landingProducts = get(content, 'fields.products', []);

    return landingProducts.reduce((mergedProducts, landingProduct) => {
      const title = get(landingProduct, 'fields.productTitle', '');
      const handle = get(landingProduct, 'fields.productHandle', '');
      const image = get(landingProduct, 'fields.image.fields.file.url', '');
      const product = get(products, handle, {});

      mergedProducts[title] = {
        handle,
        image,
        title,
        ...product
      };

      return mergedProducts;
    }, {});
  }
);

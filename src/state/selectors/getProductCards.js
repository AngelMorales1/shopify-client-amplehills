import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'products.products', []),
  state => get(state, 'products.productLanding', []),
  (shopify, landing) => {
    const content = get(landing, 'items[0]', {});
    const products = get(content, 'fields.products', []);

    return products.map(product => {
      const title = get(product, 'fields.productTitle', '');
      const handle = get(product, 'fields.productHandle', '');
      const image = get(product, 'fields.image.fields.file.url', '');

      const shopifyProduct = shopify.find(
        shopifyProduct => get(shopifyProduct, 'handle', '') === handle
      );
      const price = get(shopifyProduct, 'variants[0].price', '0.00');

      return {
        handle,
        image,
        price,
        title
      };
    });
  }
);

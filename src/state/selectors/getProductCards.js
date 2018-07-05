import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'products.products', []),
  state => get(state, 'products.productLanding', []),
  (shopify, landing) => {
    const content = get(landing, 'items[0]', {});
    const products = get(content, 'fields.products', []);

    // Index shopify products on handle.
    const shopifyProducts = shopify.reduce((mergedShopifyProducts, product) => {
      const handle = get(product, 'handle', '');
      mergedShopifyProducts[handle] = product;
      return mergedShopifyProducts;
    }, {});

    return products.map(product => {
      const title = get(product, 'fields.productTitle', '');
      const handle = get(product, 'fields.productHandle', '');
      const image = get(product, 'fields.image.fields.file.url', '');

      const shopifyProduct = get(shopifyProducts, handle, {});
      const price = get(shopifyProduct, 'variants[0].price', '0.00');
      const id = get(shopifyProduct, 'variants[0].id', '0.00');

      return {
        handle,
        id,
        image,
        price,
        title
      };
    });
  }
);
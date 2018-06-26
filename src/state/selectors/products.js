import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'products.products', []),
  state => get(state, 'products.contentfulProducts', []),
  (shopify, contentful) => {
    const products = get(contentful, 'items', {});

    return products.reduce((mergedProducts, product) => {
      const title = get(product, 'fields.productTitle', '');
      const handle = get(product, 'fields.productHandle', '');
      const flavorDescription = get(product, 'fields.flavorDescription', '');
      const gridImage = get(product, 'fields.image.fields.file.url', '');
      const pintImage = get(product, 'fields.pintImage.fields.file.url', '');
      const blocks = get(product, 'fields.contentBlocks', '');

      const shopifyProduct = shopify.find(
        shopifyProduct => get(shopifyProduct, 'handle', '') === handle
      );
      const available = get(shopifyProduct, 'variants[0].available', false);
      const price = get(shopifyProduct, 'variants[0].price', '0.00');
      const id = get(shopifyProduct, 'variants[0].id', '0.00');
      const variants = get(shopifyProduct, 'variants', []).map(variant => {
        const { id, price, title, available } = variant;
        return { id, price, title, available };
      });

      mergedProducts[handle] = {
        title,
        id,
        handle,
        available,
        flavorDescription,
        price,
        variants,
        gridImage,
        pintImage,
        blocks
      };

      return mergedProducts;
    }, {});
  }
);

import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'products.products', []),
  state => get(state, 'products.contentfulProducts', []),
  (shopify, contentful) => {
    const products = get(contentful, 'items', []);

    // Index shopify products on handle.
    const shopifyProducts = shopify.reduce((mergedShopifyProducts, product) => {
      const handle = get(product, 'handle', '');
      mergedShopifyProducts[handle] = product;
      return mergedShopifyProducts;
    }, {});

    return products.reduce((mergedProducts, product) => {
      const title = get(product, 'fields.productTitle', '');
      const handle = get(product, 'fields.productHandle', '');
      const description = get(product, 'fields.description', '');
      const flavorDescription = get(product, 'fields.flavorDescription', '');
      const gridImage = get(product, 'fields.image.fields.file.url', '');
      const pintImage = get(product, 'fields.pintImage.fields.file.url', '');
      const blocks = get(product, 'fields.contentBlocks', []);
      const shortDescription = get(product, 'fileds.shortDescription', '');

      const shopifyProduct = get(shopifyProducts, handle, {});
      const available = get(shopifyProduct, 'variants[0].available', false);
      const price = parseFloat(get(shopifyProduct, 'variants[0].price', 0.0));
      const id = get(shopifyProduct, 'variants[0].id', '');
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
        description,
        price,
        variants,
        gridImage,
        pintImage,
        blocks,
        shortDescription
      };

      return mergedProducts;
    }, {});
  }
);

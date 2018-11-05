import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => {
    const shopifyResponse = get(state, 'products.products', []);
    const products = get(
      shopifyResponse,
      'data.shop.products.edges',
      []
    ).reduce((handlizedProducts, product) => {
      const node = get(product, 'node', {});
      const price = parseFloat(get(node, 'variants.edges[0].node.price', 0.0));
      const id = get(node, 'variants.edges[0].node.id', '');
      const handle = get(node, 'handle', '');
      const variants = get(node, 'variants.edges', []).map(variant => {
        const variantNode = get(variant, 'node', {});
        const { id, title, availableForSale } = variantNode;
        const numberPrice = parseFloat(get(variantNode, 'price', 0.0));
        return { id, price: numberPrice, title, available: availableForSale };
      });

      const available = variants.some(variant => variant.available);

      const handlizedProduct = {
        id,
        price,
        variants,
        handle,
        available
      };

      handlizedProducts[handle] = handlizedProduct;
      return handlizedProducts;
    }, {});

    return products;
  },
  state => get(state, 'products.contentfulMerch.items', []),
  (shopifyProducts, contentfulProducts) => {
    return contentfulProducts.reduce((mergedProducts, product) => {
      const fields = get(product, 'fields', {});
      const title = get(fields, 'title', '');
      const handle = get(fields, 'handle', '');
      const description = get(fields, 'description', '');
      const gridImage = get(fields, 'gridImage.fields.file.url', '');
      const detailsTitle = get(fields, 'detailsTitle', '');
      const detailsContent = get(fields, 'detailsContent', []);
      const images = get(fields, 'images', []);
      const variants = get(fields, 'variant.simpleFragments', []);
      const cartDetails = get(fields, 'cartDetails', '');
      const limitedEdition = get(fields, 'limitedEdition', false);
      const contentBlocks = get(fields, 'contentBlocks', []);

      const shopifyProduct = get(shopifyProducts, handle, {
        id: null,
        price: null,
        variants: [],
        available: false
      });

      mergedProducts[handle] = {
        title,
        handle,
        description,
        detailsTitle,
        detailsContent,
        images,
        gridImage,
        variants,
        cartDetails,
        limitedEdition,
        contentBlocks,
        ...shopifyProduct
      };

      return mergedProducts;
    }, {});
  }
);

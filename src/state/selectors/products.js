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
        const { id, price, title, availableForSale } = variantNode;
        return { id, price, title, available: availableForSale };
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
  state => get(state, 'products.contentfulProducts', []),
  (shopifyProducts, contentful) => {
    const products = get(contentful, 'items', []);

    return products.reduce((mergedProducts, product) => {
      const title = get(product, 'fields.productTitle', '');
      const handle = get(product, 'fields.productHandle', '');
      const description = get(product, 'fields.description', '');
      const flavorDescription = get(product, 'fields.flavorDescription', '');
      const gridImage = get(product, 'fields.image.fields.file.url', '');
      const pintImage = get(product, 'fields.pintImage.fields.file.url', '');
      const blocks = get(product, 'fields.contentBlocks', []);
      const preOrderDate = get(product, 'fields.preOrderDate', false);
      const cartDetails = get(product, 'fields.cartDetails', '');
      const productHeroCarouselImages = get(
        product,
        'fields.productHeroCarouselImages',
        []
      );
      const productHeroImage = get(
        product,
        'fields.productHeroImage.fields.file.url',
        ''
      );
      const productHeroTitle = get(product, 'fields.productHeroTitle', '');
      const productHeroAlert = get(product, 'fields.productHeroAlert', '');
      const productHeroTitleBackgroundImage = get(
        product,
        'fields.productHeroTitleBackgroundImage.fields.file.url',
        ''
      );
      const productHeroTitleBackgroundImagePosition = get(
        product,
        'fields.productHeroTitleBackgroundImagePosition',
        0
      );
      const productHero = {
        productHeroCarouselImages,
        productHeroImage,
        productHeroTitle,
        productHeroTitleBackgroundImage,
        productHeroTitleBackgroundImagePosition,
        productHeroAlert
      };
      const whatsIncludedDrip = get(product, 'fields.whatsIncludedDrip', false);
      const whatsIncludedIllustration = get(
        product,
        'fields.whatsIncludedIllustration.fields.file.url',
        ''
      );
      const whatsIncludedProducts = get(
        product,
        'fields.whatsIncludedProducts',
        []
      );
      const whatsIncluded = {
        whatsIncludedDrip,
        whatsIncludedIllustration,
        whatsIncludedProducts
      };

      const shopifyProduct = get(shopifyProducts, handle, {
        id: null,
        price: null,
        variants: [],
        available: false
      });
      const subItems = get(product, 'fields.subItems', []).map(subItem => {
        return get(subItem, 'fields.productHandle', '');
      });
      const subItemsAvailable =
        !subItems.length ||
        subItems.every(subItem => {
          const shopifySubItem = get(shopifyProducts, subItem, {});
          const variants = get(shopifySubItem, 'variants', []);
          return variants.some(variant => variant.available);
        });
      const forceAvailable = get(product, 'fields.forceAvailable', false);
      const link = `/products/${handle}`;

      mergedProducts[handle] = {
        title,
        handle,
        flavorDescription,
        description,
        gridImage,
        pintImage,
        blocks,
        subItems,
        subItemsAvailable,
        preOrderDate,
        cartDetails,
        productHero,
        whatsIncluded,
        forceAvailable,
        link,
        ...shopifyProduct
      };

      return mergedProducts;
    }, {});
  }
);

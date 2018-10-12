import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => {
    const shopifyResponse = get(state, 'wholesale.wholesaleProducts', {});
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
  state =>
    get(state, 'products.contentfulProducts.items', []).reduce(
      (productByHandle, product) => {
        const fields = get(product, 'fields');
        productByHandle[fields.productHandle] = fields;

        return productByHandle;
      },
      {}
    ),
  (shopifyProducts, contentful) => {
    const products = Object.keys(shopifyProducts);

    return products.reduce((mergedProducts, productHandle) => {
      const product = contentful[productHandle];
      const title = get(product, 'productTitle', '');
      const handle = productHandle;
      const description = get(product, 'description', '');
      const flavorDescription = get(product, 'flavorDescription', '');
      const gridImage = get(product, 'image.fields.file.url', '');
      const pintImage = get(product, 'pintImage.fields.file.url', '');
      const blocks = get(product, 'contentBlocks', []);
      const preOrderDate = get(product, 'preOrderDate', false);
      const cartDetails = get(product, 'cartDetails', '');
      const productHeroCarouselImages = get(
        product,
        'productHeroCarouselImages',
        []
      );
      const productHeroImage = get(
        product,
        'productHeroImage.fields.file.url',
        ''
      );
      const productHeroTitle = get(product, 'productHeroTitle', '');
      const productHeroAlert = get(product, 'productHeroAlert', '');
      const productHeroTitleBackgroundImage = get(
        product,
        'productHeroTitleBackgroundImage.fields.file.url',
        ''
      );
      const productHeroTitleBackgroundImagePosition = get(
        product,
        'productHeroTitleBackgroundImagePosition',
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
      const limitedEdition = get(product, 'fields.limitedEdition', false);

      const shopifyProduct = get(shopifyProducts, productHandle, {
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

      mergedProducts[productHandle] = {
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
        limitedEdition,
        ...shopifyProduct
      };

      return mergedProducts;
    }, {});
  }
);

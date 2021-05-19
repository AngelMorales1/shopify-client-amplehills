import { createSelector } from 'reselect';
import get from 'utils/get';
import ShopifyProductTypes from 'constants/ShopifyProductTypes';

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
      const type = get(
        ShopifyProductTypes,
        get(node, 'productType', null),
        null
      );
      const variants = get(node, 'variants.edges', []).map(variant => {
        const variantNode = get(variant, 'node', {});
        const { id, price, title, availableForSale } = variantNode;
        return { id, price, title, available: availableForSale };
      });

      const uniqueVariantPrices = variants
        .map(variant => parseFloat(variant.price))
        .filter((price, index, array) => array.indexOf(price) === index)
        .sort((a, b) => a - b);

      const displayPrice =
        uniqueVariantPrices.length > 1
          ? `$${uniqueVariantPrices[0].toFixed(2)}+`
          : `$${price.toFixed(2)}`;

      const available = variants.some(variant => variant.available);

      let link = `/products/${handle}`;
      let shippableItem = true;

      if (
        type === ShopifyProductTypes.EVENTS ||
        type === ShopifyProductTypes.CLASSES
      ) {
        link = `/events/${handle}`;
        shippableItem = false;
      }

      if (type === ShopifyProductTypes.MERCH) {
        link = `/merchandise/${handle}`;
      }

      if (type === ShopifyProductTypes.PARTY_DEPOSIT) {
        link = 'party-request-form';
        shippableItem = false;
      }

      if (type === ShopifyProductTypes.CAKE_DEPOSIT) {
        link = 'cake-request-form';
        shippableItem = false;
      }

      const handlizedProduct = {
        id,
        price,
        displayPrice,
        variants,
        handle,
        available,
        type,
        link,
        shippableItem
      };

      handlizedProducts[handle] = handlizedProduct;
      return handlizedProducts;
    }, {});

    return products;
  },
  state => get(state, 'products.contentfulProducts', []),
  (shopifyProducts, contentful) => {
    const products = get(contentful, 'items', []);
    const mergedContentfulProducts = products.reduce(
      (mergedProducts, product) => {
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
        const whatsIncludedDrip = get(
          product,
          'fields.whatsIncludedDrip',
          false
        );
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

        const shopifyProduct = get(shopifyProducts, handle, {
          id: null,
          price: null,
          variants: [],
          type: null,
          available: false,
          link: ''
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
        const headerId = get(product, 'fields.headerId', '');
        const price = get(product, 'fields.price', 0);

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
          limitedEdition,
          forceAvailable,
          link,
          headerId,
          ...shopifyProduct,
          price: price || shopifyProduct.price
        };

        return mergedProducts;
      },
      {}
    );

    const allProducts = Object.values(shopifyProducts).reduce(
      (allMergedProducts, product) => {
        const contentfulProduct = get(
          mergedContentfulProducts,
          product.handle,
          null
        );

        if (!contentfulProduct) {
          const mergedProduct = contentfulProduct ? contentfulProduct : product;

          if (mergedProduct.type) {
            if (allMergedProducts[mergedProduct.type]) {
              allMergedProducts[mergedProduct.type].push(mergedProduct);
            } else {
              allMergedProducts[mergedProduct.type] = [mergedProduct];
            }
          }

          allMergedProducts[product.handle] = mergedProduct;
        }

        return allMergedProducts;
      },
      mergedContentfulProducts
    );

    return allProducts;
  }
);

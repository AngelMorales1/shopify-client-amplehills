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
    const mergedContentfulProducts = contentful.reduce(
      (mergedProducts, product) => {
        const title = get(product, 'title', '');
        const handle = get(product, 'productHandle', '');
        const description = get(product, 'description', '');
        const flavorDescription = get(product, 'flavorDescription', '');
        const gridImage = get(product, 'gridImage.src', '');
        const pintImage = get(product, 'pintImage.src', '');
        const blocks = get(product, 'blocks', []);
        // const preOrderDate = get(product, 'fields.preOrderDate', false);
        // const cartDetails = get(product, 'fields.cartDetails', '');
        // const productHeroCarouselImages = get(
        //   product,
        //   'fields.productHeroCarouselImages',
        //   []
        // );
        // const productHeroImage = get(
        //   product,
        //   'fields.productHeroImage.fields.file.url',
        //   ''
        // );
        // const productHeroTitle = get(product, 'fields.productHeroTitle', '');
        // const productHeroAlert = get(product, 'fields.productHeroAlert', '');
        // const productHeroTitleBackgroundImage = get(
        //   product,
        //   'fields.productHeroTitleBackgroundImage.fields.file.url',
        //   ''
        // );
        // const productHeroTitleBackgroundImagePosition = get(
        //   product,
        //   'fields.productHeroTitleBackgroundImagePosition',
        //   0
        // );
        // const productHero = {
        //   productHeroCarouselImages,
        //   productHeroImage,
        //   productHeroTitle,
        //   productHeroTitleBackgroundImage,
        //   productHeroTitleBackgroundImagePosition,
        //   productHeroAlert
        // };
        // const whatsIncludedDrip = get(
        //   product,
        //   'fields.whatsIncludedDrip',
        //   false
        // );
        // const whatsIncludedIllustration = get(
        //   product,
        //   'fields.whatsIncludedIllustration.fields.file.url',
        //   ''
        // );
        // const whatsIncludedProducts = get(
        //   product,
        //   'fields.whatsIncludedProducts',
        //   []
        // );
        // const whatsIncluded = {
        //   whatsIncludedDrip,
        //   whatsIncludedIllustration,
        //   whatsIncludedProducts
        // };

        const limitedEdition = get(product, 'limitedEdition', false);

        const shopifyProduct = get(shopifyProducts, handle, {
          id: null,
          price: null,
          variants: [],
          type: null,
          available: false,
          link: ''
        });
        const subItems = get(product, 'subItems', []).map(subItem => {
          return get(subItem, 'fields.productHandle', '');
        });
        const subItemsAvailable =
          !subItems.length ||
          subItems.every(subItem => {
            const shopifySubItem = get(shopifyProducts, subItem, {});
            const variants = get(shopifySubItem, 'variants', []);
            return variants.some(variant => variant.available);
          });
        const forceAvailable = get(product, 'forceAvailable', false);
        const headerId = get(product, 'headerId', '');
        const price = get(product, 'price', 0);

        const link = `/products/${handle}`;
        const availableInByo = get(product, 'availableInBYO', false);

        const seoTitle = get(product, 'seoTitle', '');
        const seoDescription = get(product, 'seoDescription', '');
        const seoImage = get(product, 'seoImage.fields.file.url', '');

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
          availableInByo,
          // preOrderDate,
          // cartDetails,
          // productHero,
          // whatsIncluded,
          // limitedEdition,
          forceAvailable,
          link,
          headerId,
          // seoTitle,
          // seoDescription,
          // seoImage,
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

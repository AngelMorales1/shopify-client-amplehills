import { createSelector } from 'reselect';
import get from 'utils/get';
import getShortTimeFormat from 'utils/getShortTimeFormat';
import moment from 'moment';

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
        return { id, price, date: title, available: availableForSale };
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
  state => get(state, 'events.events'),
  (shopifyProducts, contentfulProduct) => {
    const events = get(contentfulProduct, 'items', []);

    return events.reduce((mergedProducts, event) => {
      const fields = get(event, 'fields', {});
      const title = get(fields, 'title', '');
      const handle = get(fields, 'eventHandle', '');
      const contentfulId = get(event, 'sys.id', '');
      const blockCardText = get(fields, 'blockCardText', '');
      const eventType = get(fields, 'eventType', '');
      const image = get(fields, 'image.fields.file.url', '');
      const locationTitle = get(fields, 'location.fields.title', '');
      const locationId = get(fields, 'location.sys.id', '');
      const locationPhone = get(fields, 'location.fields.phone', '');
      const contentBlocks = get(fields, 'contentBlocks', []);
      const text = get(fields, 'text', '');
      const link = `/events/${handle}`;
      const blockCardButtonLabel = get(fields, 'blockCardButtonLabel', '');

      const shopifyProduct = get(shopifyProducts, handle, {
        id: null,
        price: null,
        variants: [],
        available: false
      });

      const datesAndTimes = shopifyProduct.id
        ? shopifyProduct.variants.map(variant => {
            const dateAndTime = variant.date.split(', ');
            const time = dateAndTime[1];
            const date = dateAndTime[0];
            const getDateFormat = Date.parse(date);
            const sortedDate = !isNaN(getDateFormat)
              ? moment(getDateFormat).format('dddd, MMMM Do')
              : '';
            const sortedTime = getShortTimeFormat(time) || '';

            return { time, date, sortedDate, sortedTime };
          })
        : get(fields, 'datesAndTimes.fragments', []).map(fragment => {
            const sortedFragment = fragment.reduce(
              (sortedDateAndTime, dateAndTime) => {
                const key = dateAndTime.key.toLowerCase();

                sortedDateAndTime[key] = dateAndTime.value;

                return sortedDateAndTime;
              },
              {}
            );

            const getMultipleDateFormat = Date.parse(
              get(sortedFragment, 'date', '')
            );
            const sortedDate = !isNaN(getMultipleDateFormat)
              ? moment(getMultipleDateFormat).format('dddd, MMMM Do')
              : '';
            const sortedTime =
              getShortTimeFormat(get(sortedFragment, 'time', '')) || '';

            return { ...sortedFragment, sortedDate, sortedTime };
          });

      const seoTitle = get(fields, 'seoTitle', '');
      const seoDescription = get(fields, 'seoDescription', '');
      const seoImage = get(fields, 'seoImage.fields.file.url', '');

      mergedProducts[handle] = {
        title,
        handle,
        contentfulId,
        blockCardText,
        eventType,
        image,
        locationTitle,
        locationId,
        contentBlocks,
        text,
        link,
        datesAndTimes,
        locationPhone,
        blockCardButtonLabel,
        seoTitle,
        seoDescription,
        seoImage,
        ...shopifyProduct
      };

      return mergedProducts;
    }, {});
  }
);

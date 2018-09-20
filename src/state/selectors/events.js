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
  state => get(state, 'events.events'),
  (shopifyProducts, contentfulProduct) => {
    const events = get(contentfulProduct, 'items', []);

    return events.map(event => {
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

      const shopifyProduct = get(shopifyProducts, handle, {
        id: null,
        price: null,
        variants: [],
        available: false
      });

      const datesAndTimes = get(fields, 'datesAndTimes.fragments', []).map(
        fragment => {
          const sortedFragment = fragment.reduce(
            (sortedDateAndTime, dateAndTime) => {
              sortedDateAndTime[dateAndTime.key] = dateAndTime.value;

              return sortedDateAndTime;
            },
            {}
          );

          const startTime = get(sortedFragment, 'Time', '').split('-')[0];
          const title = `${moment(get(sortedFragment, 'Date', '')).format(
            'MM/DD/YY'
          )}-${getShortTimeFormat(startTime)}`;

          const shopifyDateAndTime = get(shopifyProduct, 'variants', []).find(
            dateAndTime => get(dateAndTime, 'title', '') === title
          );

          return { ...sortedFragment, ...shopifyDateAndTime };
        }
      );

      return {
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
        datesAndTimes,
        locationPhone,
        ...shopifyProduct
      };
    });
  }
);

import { createSelector } from 'reselect';
import get from 'utils/get';
import getShortTimeFormat from 'utils/getShortTimeFormat';
import { compareAsc, format, parse } from 'date-fns';
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
  state => get(state, 'events'),
  (shopifyProducts, events) => {
    if (!events || !events.events || !events.events.length) return {};

    return events.events.reduce((mergedProducts, event) => {
      const title = get(event, 'name', '');
      const handle = get(event, 'handle', '');
      const contentfulId = get(event, '_id', '');
      const blockCardText = get(event, 'cardText', '');
      const eventType = get(event, 'eventType', '');
      const image = get(event, 'image', '');
      const locationTitle = get(event, 'location.name', '');
      const locationId = get(event, 'location._id', '');
      const locationPhone = get(event, 'location.phone', '');
      const locationSlug = get(event, 'location.slug', '');
      const locationAddress1 = get(event, 'location.address1', '');
      const locationCity = get(event, 'location.city', '');
      const locationState = get(event, 'location.state', '');
      const locationZip = get(event, 'location.zip', '');
      const locationAddress = `${locationAddress1}, ${locationCity}, ${locationState}`;
      const contentBlocks = get(event, 'blocks', []);
      const text = get(event, 'text', '');
      const link = `/events/${handle}`;
      const blockCardButtonLabel = get(event, 'cardButtonLabel', '');

      // TO-DO fix these events in Shopify to have better handles
      const shopifyProduct =
        get(shopifyProducts, handle) ||
        get(shopifyProducts, handle.split('-').join(''), {
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
        : get(event, 'datesAndTimes.fragments', []).map(fragment => {
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

      const heroColor = get(event, 'heroColor', '#fff');
      const heroDescription = get(event, 'heroDescription', '');
      const shopifyVariants = get(event, 'shopifyVariants', []);
      const product = get(event, 'product', '');
      const frequency = get(event, 'frequency', '');

      const seoTitle = get(event, 'seoTitle', '');
      const seoDescription = get(event, 'seoDescription', '');
      const seoImage = get(event, 'seoImage.fields.file.url', '');

      mergedProducts[handle] = {
        title,
        handle,
        contentfulId,
        blockCardText,
        eventType,
        image,
        contentBlocks,
        text,
        link,
        datesAndTimes,
        locationPhone,
        locationSlug,
        locationAddress,
        locationTitle,
        locationId,
        blockCardButtonLabel,
        heroColor,
        heroDescription,
        frequency,
        shopifyVariants,
        seoTitle,
        seoDescription,
        seoImage,
        product,
        ...shopifyProduct,
        availability: shopifyProduct.variants.reduce(
          (availability, variant) => {
            availability[variant.date] = variant.available;

            return availability;
          },
          {}
        ),
        variants: shopifyProduct.variants.map(variant => {
          const dateStrWithoutEndTime = variant.date.split('-')[0];
          const sanitizedDate = variant.date.split(',');

          // Compensating for year to be 2 or 4 digits
          const m =
            get(sanitizedDate[0].split('/'), '[0]', '').length === 2
              ? 'MM'
              : 'M';
          const d =
            get(sanitizedDate[0].split('/'), '[1]', '').length === 2
              ? 'dd'
              : 'd';
          const y =
            get(sanitizedDate[0].split('/'), '[2]', '').length === 2
              ? 'yy'
              : 'yyyy';
          const t =
            sanitizedDate[1] && sanitizedDate[1].includes(':') ? 'h:mma' : 'ha';
          const datetime =
            dateStrWithoutEndTime === 'Default Title'
              ? new Date()
              : parse(
                  dateStrWithoutEndTime,
                  `${m}/${d}/${y}, ${t}`,
                  new Date()
                );

          const dateStr = format(datetime, `${m}/${d}/${y}`);
          const timeStr = format(datetime, 'ha');

          return { ...variant, datetime, dateStr, timeStr };
        })
      };

      return mergedProducts;
    }, {});
  }
);

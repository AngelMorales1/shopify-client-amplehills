import { createSelector } from 'reselect';
import get from 'utils/get';
import getProductHandleFromVariantId from 'utils/getProductHandleFromVariantId';
import getLineItemPrice from 'utils/getLineItemPrice';
import {
  GENERAL_PRODUCT,
  EVENT,
  PARTY_DEPOSIT,
  CHOOSE_YOUR_OWN_STORY
} from 'constants/ProductTypes';

import checkout from 'state/selectors/checkout';
import getProducts from 'state/selectors/products';
import getEvents from 'state/selectors/events';
import getPartyDeposit from 'state/selectors/partyDeposit';

const getProductTypeAndProduct = (allProducts, productId, item) => {
  // const getProducts = products(state);
  // const getEvents = events(state);
  // const getPartyDeposit = partyDeposit(state);
  const handle = getProductHandleFromVariantId(
    allProducts.products,
    allProducts.events,
    item,
    allProducts.partyDeposit
  );

  if (handle === 'choose-your-own-story') {
    return {
      handle,
      productType: CHOOSE_YOUR_OWN_STORY,
      product: allProducts.products[handle]
    };
  }
  if (allProducts.products[handle]) {
    return {
      handle,
      productType: GENERAL_PRODUCT,
      product: allProducts.products[handle]
    };
  }
  if (allProducts.partyDeposit.handle === handle) {
    return {
      handle,
      productType: PARTY_DEPOSIT,
      product: allProducts.partyDeposit
    };
  }
  if (allProducts.events[handle]) {
    return { handle, productType: EVENT, product: allProducts.events[handle] };
  }
};

export const deriveLineItems = (checkout, allProducts) =>
  checkout.lineItems.reduce((lineItems, node) => {
    const item = get(node, 'node', {});
    const id = get(item, 'id', '');
    const title = get(item, 'title', '');
    const quantity = get(item, 'quantity', 0);
    const price = getLineItemPrice(get(item, 'variant.price', 0.0), quantity);

    const attributes = get(item, 'customAttributes', []);
    const itemIsEvent = get(attributes[0], 'key', '').includes('Event Time');
    const allSubItems = attributes.filter(attribute => {
      return itemIsEvent
        ? get(attribute, 'key', '').includes('Event Time')
        : get(attribute, 'key', '').includes('Item');
    });

    const subItemsObject = allSubItems.reduce((uniqueSubItems, subItem) => {
      uniqueSubItems[subItem.value]
        ? uniqueSubItems[subItem.value].quantity++
        : (uniqueSubItems[subItem.value] = {
            handle: subItem.value,
            quantity: 1
          });
      return uniqueSubItems;
    }, {});

    const subItems = Object.values(subItemsObject).sort(
      (a, b) => b.quantity - a.quantity
    );

    const variant = get(item, 'variant', {});
    const productId = get(variant, 'id', '');

    const sanitisedItem = {
      id,
      title,
      price,
      quantity,
      attributes,
      subItems,
      productId,
      variant
    };

    const productTypeAndProduct = getProductTypeAndProduct(
      allProducts,
      productId,
      sanitisedItem
    );

    sanitisedItem.cartItemDetails = subItems.map(subItem => {
      return productTypeAndProduct.productType === CHOOSE_YOUR_OWN_STORY
        ? `${subItem.quantity}x ${allProducts.products[subItem.handle].title}`
        : subItem.handle;
    });

    lineItems.push({
      ...sanitisedItem,
      ...productTypeAndProduct
    });

    return lineItems;
  }, []);

export default createSelector(
  state => checkout(state),
  state => {
    const products = getProducts(state);
    const events = getEvents(state);
    const partyDeposit = getPartyDeposit(state);

    return { products, events, partyDeposit };
  },
  deriveLineItems
);

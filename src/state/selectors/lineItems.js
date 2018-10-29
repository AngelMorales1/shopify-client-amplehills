import { createSelector } from 'reselect';
import get from 'utils/get';
import getLineItemPrice from 'utils/getLineItemPrice';
import getProductTypeFromProduct from 'utils/getProductTypeFromProduct';
import {
  EVENT,
  PARTY_DEPOSIT,
  CHOOSE_YOUR_OWN_STORY
} from 'constants/ProductTypes';

import checkout from 'state/selectors/checkout';
import getProducts from 'state/selectors/products';
import getEvents from 'state/selectors/events';
import getPartyDeposit from 'state/selectors/partyDeposit';

const getProduct = (allProducts, productId) => {
  if (productId === get(allProducts, 'partyDeposit.id', '')) {
    return allProducts.partyDeposit;
  }

  const findFromProducts = Object.values(get(allProducts, 'products', {})).find(
    product => product.id === productId
  );

  if (findFromProducts) {
    return findFromProducts;
  }

  const findFromEvent = Object.values(get(allProducts, 'events', {})).find(
    event => event.variants.find(variant => variant.id === productId)
  );

  if (findFromEvent) {
    return findFromEvent;
  }

  return {};
};

export const deriveLineItems = (checkout, allProducts) =>
  checkout.lineItems.reduce((lineItems, node) => {
    const item = get(node, 'node', {});
    const id = get(item, 'id', '');
    const title = get(item, 'title', '');
    const quantity = get(item, 'quantity', 0);
    const price = getLineItemPrice(get(item, 'variant.price', 0.0), quantity);
    const variant = get(item, 'variant', {});
    const productId = get(variant, 'id', '');
    const attributes = get(item, 'customAttributes', []);
    const product = getProduct(allProducts, productId);
    const productType = getProductTypeFromProduct(
      product,
      get(allProducts, 'products', {}),
      get(allProducts, 'partyDeposit', {}),
      get(allProducts, 'events', {})
    );

    let cartItemDetails = [];

    if (productType === CHOOSE_YOUR_OWN_STORY) {
      const getUniqueAttribute = attributes
        .filter(attribute => get(attribute, 'key', '').includes('Item'))
        .reduce((uniqueAttribute, attribute) => {
          uniqueAttribute[attribute.value]
            ? uniqueAttribute[attribute.value].quantity++
            : (uniqueAttribute[attribute.value] = {
                handle: attribute.value,
                quantity: 1
              });
          return uniqueAttribute;
        }, {});

      cartItemDetails = Object.values(getUniqueAttribute)
        .sort((a, b) => b.quantity - a.quantity)
        .map(
          attribute =>
            `${attribute.quantity}x ${
              allProducts.products[attribute.handle].title
            }`
        );
    }

    if (productType === PARTY_DEPOSIT) {
      cartItemDetails = attributes.map(
        attribute => `${attribute.key}: ${attribute.value}`
      );
    }

    if (productType === EVENT) {
      const eventDate = product.variants.find(
        variant => variant.id === productId
      ).date;
      cartItemDetails.push(eventDate);
    }

    const cartDetails = get(product, 'cartDetails', '');

    if (cartDetails) {
      cartItemDetails.unshift(cartDetails);
    }

    const sanitisedItem = {
      id,
      title,
      price,
      quantity,
      attributes,
      productId,
      variant,
      cartItemDetails,
      product
    };

    lineItems.push({
      ...sanitisedItem
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

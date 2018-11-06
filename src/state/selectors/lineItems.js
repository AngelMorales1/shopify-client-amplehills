import { createSelector } from 'reselect';
import get from 'utils/get';
import getLineItemPrice from 'utils/getLineItemPrice';
import ShopifyProductTypes from 'constants/ShopifyProductTypes';

import checkout from 'state/selectors/checkout';
import products from 'state/selectors/products';

export const deriveLineItems = (checkout, products) =>
  checkout.lineItems.reduce((lineItems, node) => {
    const item = get(node, 'node', {});
    const id = get(item, 'id', '');
    const title = get(item, 'title', '');
    const quantity = get(item, 'quantity', 0);
    const price = getLineItemPrice(get(item, 'variant.price', 0.0), quantity);
    const variant = get(item, 'variant', {});
    const productId = get(variant, 'id', '');
    const attributes = get(item, 'customAttributes', []);
    const handle = get(item, 'variant.product.handle', '');
    const product = get(products, handle, {});
    const cartDetails = get(product, 'cartDetails', '');
    const productType = get(product, 'type', '');

    const subItems = get(product, 'subItems', []).reduce(
      (uniqueSubItems, subItem) => {
        uniqueSubItems[subItem]
          ? uniqueSubItems[subItem].quantity++
          : (uniqueSubItems[subItem] = {
              handle: subItem,
              quantity: 1
            });
        return uniqueSubItems;
      },
      {}
    );

    const customSubItems = attributes
      .filter(attribute => attribute.key.includes('Item'))
      .reduce((uniqueCustomSubItems, attribute) => {
        uniqueCustomSubItems[attribute.value]
          ? uniqueCustomSubItems[attribute.value].quantity++
          : (uniqueCustomSubItems[attribute.value] = {
              handle: attribute.value,
              quantity: 1
            });
        return uniqueCustomSubItems;
      }, {});

    let cartAttributes = cartDetails ? [cartDetails] : [];
    cartAttributes = Object.values(subItems)
      .sort((a, b) => b.quantity - a.quantity)
      .reduce((itemAttributes, subItem) => {
        itemAttributes.push(
          `${subItem.quantity}x ${
            get(products, subItem.handle, subItem.handle).title
          }`
        );
        return itemAttributes;
      }, cartAttributes);

    cartAttributes = Object.values(customSubItems)
      .sort((a, b) => b.quantity - a.quantity)
      .reduce((itemAttributes, attribute) => {
        itemAttributes.push(
          `${attribute.quantity}x ${
            get(products, attribute.handle, attribute.handle).title
          }`
        );
        return itemAttributes;
      }, cartAttributes);

    cartAttributes = attributes
      .filter(
        attribute =>
          !attribute.key.includes('Item') &&
          !attribute.key.includes('Shipping Estimate')
      )
      .reduce((stringifiedAttributes, attribute) => {
        stringifiedAttributes.push(`${attribute.key}: ${attribute.value}`);
        return stringifiedAttributes;
      }, cartAttributes);

    if (
      productType === ShopifyProductTypes.CLASSES ||
      productType === ShopifyProductTypes.EVENTS ||
      productType === ShopifyProductTypes.MERCH
    ) {
      const date = get(variant, 'title', '');
      if (date) cartAttributes.push(date);
    }

    const sanitisedItem = {
      id,
      title,
      price,
      quantity,
      attributes,
      productId,
      variant,
      cartAttributes,
      product
    };

    lineItems.push({
      ...sanitisedItem
    });

    return lineItems;
  }, []);

export default createSelector(
  state => checkout(state),
  state => products(state),
  deriveLineItems
);

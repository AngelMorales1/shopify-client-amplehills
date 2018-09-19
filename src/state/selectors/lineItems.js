import { createSelector } from 'reselect';
import get from 'utils/get';
import getLineItemPrice from 'utils/getLineItemPrice';

import checkout from 'state/selectors/checkout';

export const deriveLineItems = checkout =>
  checkout.lineItems.reduce((lineItems, node) => {
    const item = get(node, 'node', {});
    const id = get(item, 'id', '');
    const title = get(item, 'title', '');
    const quantity = get(item, 'quantity', 0);
    const price = getLineItemPrice(get(item, 'variant.price', 0.0), quantity);

    const attributes = get(item, 'customAttributes', []);
    const itemIsEvent = get(attributes[0], 'key', '').includes('eventTime');

    const allSubItems = attributes.filter(attribute => {
      return itemIsEvent
        ? get(attribute, 'key', '').includes('eventTime')
        : get(attribute, 'key', '').includes('Item ');
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

    lineItems.push({
      id,
      title,
      price,
      quantity,
      attributes,
      subItems,
      productId,
      variant
    });

    return lineItems;
  }, []);

export default createSelector(state => checkout(state), deriveLineItems);

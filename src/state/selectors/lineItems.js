import { createSelector } from 'reselect';
import get from 'utils/get';
import getLineItemPrice from 'utils/getLineItemPrice';

export const deriveLineItems = items =>
  items.reduce((lineItems, item) => {
    const id = get(item, 'id', '');
    const title = get(item, 'title', '');
    const quantity = get(item, 'quantity', 0);
    const price = getLineItemPrice(get(item, 'variant.price', 0.0), quantity);

    const attributes = get(item, 'customAttributes', []);
    const allSubItems = attributes.filter(attribute =>
      get(attribute, 'key', '').includes('Item ')
    );

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

    const productId = get(item, 'variant.id', '');

    lineItems.push({
      id,
      title,
      price,
      quantity,
      attributes,
      subItems,
      productId
    });

    return lineItems;
  }, []);

export default createSelector(
  state => get(state, 'session.checkout.lineItems', []),
  deriveLineItems
);

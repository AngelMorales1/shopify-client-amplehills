import { createSelector } from 'reselect';
import get from 'utils/get';
import getLineItemPrice from 'utils/getLineItemPrice';

export default createSelector(
  state => get(state, 'session.checkout.lineItems', []),
  items => {
    return items.reduce((lineItems, item) => {
      const id = get(item, 'id', '');
      const title = get(item, 'title', '');
      const quantity = get(item, 'quantity', 0);
      const price = getLineItemPrice(
        get(item, 'variant.price', '0.00'),
        quantity
      );

      const attributes = get(item, 'customAttributes', []);
      const allSubItems = attributes.filter(attribute =>
        get(attribute, 'key', '').includes('subItem-')
      );
      const subItems = allSubItems
        .reduce((uniques, subItem) => {
          const similarIndex = uniques.findIndex(
            (item, index) => item.handle === subItem.value
          );

          if (similarIndex > -1) {
            uniques[similarIndex].quantity++;
          } else {
            uniques.push({ handle: subItem.value, quantity: 1 });
          }

          return uniques;
        }, [])
        .sort((a, b) => b.quantity - a.quantity);

      return lineItems.concat([
        {
          id,
          title,
          price,
          quantity,
          attributes,
          subItems
        }
      ]);
    }, []);
  }
);

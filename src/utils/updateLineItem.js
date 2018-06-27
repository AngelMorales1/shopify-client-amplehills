import get from 'utils/get';
import { updateLineItems } from 'state/actions/checkoutActions';

const updateLineItem = (item, quantity, id) => {
  console.log(item, quantity, id);
  const items = [
    {
      id: item,
      quantity
    }
  ];

  updateLineItems(id, items);
  console.log(updateLineItems);
};

export default updateLineItem;

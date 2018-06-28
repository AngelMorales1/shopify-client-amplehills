import get from 'utils/get';
import { updateLineItems } from 'state/actions/checkoutActions';

const updateLineItem = (item, quantity) => {
  const items = [
    {
      id: item,
      quantity
    }
  ];

  updateLineItems(get(this.props, 'checkout.id', null), items);
};

export default updateLineItem;

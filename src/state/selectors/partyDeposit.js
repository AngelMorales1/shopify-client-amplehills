import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state =>
    get(state, 'products.products.data.shop.products.edges', []).find(
      product => {
        return get(product, 'node.handle', '') === 'party-deposit';
      }
    ),
  partyDeposit => {
    const node = get(partyDeposit, 'node', {});
    const price = parseFloat(
      get(node, 'variants.edges[0].node.price', 0.0)
    ).toFixed(2);
    const id = get(node, 'variants.edges[0].node.id', '');
    const handle = get(node, 'handle', '');
    const title = get(node, 'title', '');
    const description = get(node, 'description', '');
    const variants = get(node, 'variants.edges', []).map(variant => {
      const variantNode = get(variant, 'node', {});
      const { id, price, title, availableForSale } = variantNode;
      return { id, price, title, available: availableForSale };
    });
    const link = '/party-request-form';

    const available = variants.some(variant => variant.available);

    const handlizedProduct = {
      id,
      price,
      variants,
      handle,
      available,
      description,
      title,
      link
    };

    return handlizedProduct;
  }
);

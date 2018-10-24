import get from 'utils/get';

export default (products, events, item, partyDeposit) => {
  const product = Object.values(products)
    .concat(Object.values(events))
    .concat([partyDeposit])
    .find(product => {
      return product.variants.some(variant => variant.id === item.productId);
    });

  return get(product, 'handle', '');
};

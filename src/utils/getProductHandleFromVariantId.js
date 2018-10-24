export default (products, events, item, partyDeposit) => {
  return Object.values(products)
    .concat(Object.values(events))
    .concat([partyDeposit])
    .find(product => {
      return product.variants.some(variant => variant.id === item.productId);
    }).handle;
};

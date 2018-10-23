export default (products, events, item, partyDeposit) => {
  return Object.values(products)
    .concat(events)
    .concat([partyDeposit])
    .find(product => {
      return product.variants.some(variant => variant.id === item.productId);
    }).handle;
};

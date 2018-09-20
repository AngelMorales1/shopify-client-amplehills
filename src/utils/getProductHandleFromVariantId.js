export default (products, events, item) => {
  return Object.values(products)
    .concat(events)
    .find(product => {
      return product.variants.some(variant => variant.id === item.productId);
    }).handle;
};

export default (price, quantity) => {
  return (parseFloat(price) * parseInt(quantity)).toFixed(2);
};

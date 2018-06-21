export default (price, quantity) => {
  return (parseFloat(price) * parseInt(quantity, 10)).toFixed(2);
};

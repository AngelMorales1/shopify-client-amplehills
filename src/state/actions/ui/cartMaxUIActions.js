export const OPEN_CART_MAX = 'OPEN_CART_MAX';
export const openCartMax = payload => {
  return {
    type: OPEN_CART_MAX,
    payload: true
  };
};

export const CLOSE_CART_MAX = 'CLOSE_CART_MAX';
export const closeCartMax = payload => {
  return {
    type: CLOSE_CART_MAX,
    payload: false
  };
};

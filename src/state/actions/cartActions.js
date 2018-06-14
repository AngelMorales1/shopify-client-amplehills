export const OPEN_CART = 'OPEN_CART';
export const openCart = payload => {
  return {
    type: OPEN_CART,
    payload: true
  };
};

export const CLOSE_CART = 'CLOSE_CART';
export const closeCart = payload => {
  return {
    type: CLOSE_CART,
    payload: false
  };
};

export const OPEN_MINI_CART = 'OPEN_MINI_CART';
export const openMiniCart = payload => {
  return {
    type: OPEN_MINI_CART,
    payload: true
  };
};

export const CLOSE_MINI_CART = 'CLOSE_MINI_CART';
export const closeMiniCart = payload => {
  return {
    type: CLOSE_MINI_CART,
    payload: false
  };
};

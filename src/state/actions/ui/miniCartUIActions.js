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

export const OPEN_DELETE_MODAL = 'OPEN_DELETE_MODAL';
export const openDeleteModal = payload => {
  return {
    type: OPEN_DELETE_MODAL,
    payload: true
  };
};

export const CLOSE_DELETE_MODAL = 'CLOSE_DELETE_MODAL';
export const closeDeleteModal = payload => {
  return {
    type: CLOSE_DELETE_MODAL,
    payload: false
  };
};

export const OPEN_SHOP_DROPDOWN = 'OPEN_SHOP_DROPDOWN';
export const openShopDropdown = payload => {
  return {
    type: OPEN_SHOP_DROPDOWN,
    payload: true
  };
};

export const CLOSE_SHOP_DROPDOWN = 'CLOSE_SHOP_DROPDOWN';
export const closeShopDropdown = payload => {
  return {
    type: CLOSE_SHOP_DROPDOWN,
    payload: false
  };
};

export const OPEN_SHOP_ONLINE = 'OPEN_SHOP_ONLINE';
export const openShopOnline = payload => {
  return {
    type: OPEN_SHOP_ONLINE,
    payload: true
  };
};

export const CLOSE_SHOP_ONLINE = 'CLOSE_SHOP_ONLINE';
export const closeShopOnline = payload => {
  return {
    type: CLOSE_SHOP_ONLINE,
    payload: false
  };
};

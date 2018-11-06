export const OPEN_SHOP_DROPDOWN = 'OPEN_SHOP_DROPDOWN';
export const openShopDropdown = () => {
  return {
    type: OPEN_SHOP_DROPDOWN,
    payload: true
  };
};
export const CLOSE_SHOP_DROPDOWN = 'CLOSE_SHOP_DROPDOWN';
export const closeShopDropdown = () => {
  return {
    type: CLOSE_SHOP_DROPDOWN,
    payload: false
  };
};
export const OPEN_LOCATION_DROPDOWN = 'OPEN_LOCATION_DROPDOWN';
export const openLocationDropdown = () => {
  return {
    type: OPEN_LOCATION_DROPDOWN,
    payload: true
  };
};
export const CLOSE_LOCATION_DROPDOWN = 'CLOSE_LOCATION_DROPDOWN';
export const closeLocationDropdown = () => {
  return {
    type: CLOSE_LOCATION_DROPDOWN,
    payload: false
  };
};

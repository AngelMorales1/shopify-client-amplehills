export const OPEN_MOBILE_NAV = 'OPEN_MOBILE_NAV';
export const openMobileNav = payload => {
  return {
    type: OPEN_MOBILE_NAV,
    payload: true
  };
};

export const CLOSE_MOBILE_NAV = 'CLOSE_MOBILE_NAV';
export const closeMobileNav = payload => {
  return {
    type: CLOSE_MOBILE_NAV,
    payload: false
  };
};

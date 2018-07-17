export const OPEN_OUR_PLEDGE = 'OPEN_OUR_PLEDGE';
export const openOurPledge = () => {
  return {
    type: OPEN_OUR_PLEDGE,
    ourPledgeOverlayIsOpen: true
  };
};

export const CLOSE_OUR_PLEDGE = 'CLOSE_OUR_PLEDGE';
export const closeOurPledge = () => {
  return {
    type: CLOSE_OUR_PLEDGE,
    ourPledgeOverlayIsOpen: false
  };
};

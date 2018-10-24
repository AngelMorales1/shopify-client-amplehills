import { GENERAL_PRODUCT, EVENT, PARTY_DEPOSIT } from 'constants/ProductTypes';

export default (handle, products, partyDeposit, events) => {
  if (products[handle]) {
    return GENERAL_PRODUCT;
  }

  if (partyDeposit.handle === handle) {
    return PARTY_DEPOSIT;
  }

  if (events[handle]) {
    return EVENT;
  }
};

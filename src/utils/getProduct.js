import { GENERAL_PRODUCT, EVENT, PARTY_DEPOSIT } from 'constants/ProductTypes';

export default (productType, handle, products, partyDeposit, events) => {
  switch (productType) {
    case GENERAL_PRODUCT:
      return products[handle];
    case PARTY_DEPOSIT:
      return partyDeposit;
    case EVENT:
      return events[handle];
    default:
      return {};
  }
};

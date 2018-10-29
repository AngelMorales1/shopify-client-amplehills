import {
  GENERAL_PRODUCT,
  EVENT,
  PARTY_DEPOSIT,
  CHOOSE_YOUR_OWN_STORY
} from 'constants/ProductTypes';

export default (product, products, partyDeposit, events) => {
  const handle = product.handle;

  if (handle === 'choose-your-own-story') {
    return CHOOSE_YOUR_OWN_STORY;
  }

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

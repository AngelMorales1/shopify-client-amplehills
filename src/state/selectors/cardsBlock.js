import { createSelector } from 'reselect';
import get from 'utils/get';

const cardBlockHasDate = cardBlock => {
  return !!Object.values(cardBlock).find(data => {
    return data.length > 0;
  });
};

export default createSelector(
  items => items,
  items => {
    const cardBlock1 = {};
    cardBlock1.text = get(items, 'cardBlock1Text', '');
    cardBlock1.link = get(items, 'cardBlock1Link', '');
    cardBlock1.color = get(items, 'cardBlock1Color', '');
    cardBlock1.image = get(items, 'cardBlock1Image.fields.file.url', '');

    const cardBlock2 = {};
    cardBlock2.text = get(items, 'cardBlock2Text', '');
    cardBlock2.link = get(items, 'cardBlock2Link', '');
    cardBlock2.color = get(items, 'cardBlock2Color', '');
    cardBlock2.image = get(items, 'cardBlock2Image.fields.file.url', '');

    const cardBlock = {};

    if (cardBlockHasDate(cardBlock1)) {
      cardBlock.cardBlock1 = cardBlock1;
    }
    if (cardBlockHasDate(cardBlock2)) {
      cardBlock.cardBlock2 = cardBlock2;
    }

    return cardBlock;
  }
);

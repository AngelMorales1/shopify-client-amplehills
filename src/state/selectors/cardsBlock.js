import { createSelector } from 'reselect';
import get from 'utils/get';

const cardBlockHasDate = cardBlock => {
  return !!Object.values(cardBlock).find(data => {
    return data.length > 0;
  });
};

export default createSelector(
  items => get(items, 'fields', {}),
  fields => {
    const cardBlock1 = {};
    cardBlock1.text = get(fields, 'cardBlock1Text', '');
    cardBlock1.link = get(fields, 'cardBlock1Link', '');
    cardBlock1.color = get(fields, 'cardBlock1Color', '');
    cardBlock1.image = get(fields, 'cardBlock1Image.fields.file.url', '');

    const cardBlock2 = {};
    cardBlock2.text = get(fields, 'cardBlock2Text', '');
    cardBlock2.link = get(fields, 'cardBlock2Link', '');
    cardBlock2.color = get(fields, 'cardBlock2Color', '');
    cardBlock2.image = get(fields, 'cardBlock2Image.fields.file.url', '');

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

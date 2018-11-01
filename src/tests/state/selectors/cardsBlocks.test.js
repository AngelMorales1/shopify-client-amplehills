import unselectedCardsBlock from 'tests/state/mocks/unselected/cardsBlock';
import selectedCardsBlock from 'tests/state/mocks/selected/cardsBlock';
import cardsBlock from 'state/selectors/cardsBlock';

it('cardsBlock selector works as intended', () => {
  expect(cardsBlock.resultFunc(unselectedCardsBlock)).toEqual(
    selectedCardsBlock
  );
});

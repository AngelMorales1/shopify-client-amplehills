import pressItems from 'state/selectors/pressItems';
import selectedPressItems from 'tests/state/mocks/selected/PressItems';
import unselectedPressItems from 'tests/state/mocks/unselected/PressItems';
it('pressItems selector works as intended', () => {
  expect(pressItems.resultFunc(unselectedPressItems)).toEqual(
    selectedPressItems
  );
});

import selectedflavors from 'tests/state/mocks/selected/flavors';
import unselectedflavors from 'tests/state/mocks/unselected/flavors';
import flavors from 'state/selectors/flavors';

it('flavors selector works as intended', () => {
  expect(flavors.resultFunc(unselectedflavors)).toEqual(selectedflavors);
});

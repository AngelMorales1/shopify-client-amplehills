import selectedflavor from 'tests/state/mocks/selected/flavor';
import unselectedflavors from 'tests/state/mocks/unselected/flavors';
import flavor from 'state/selectors/flavor';
import flavors from 'state/selectors/flavors';

it('flavor selector works as intended', () => {
  const selectedflavors = flavors.resultFunc(unselectedflavors);
  const slug = 'flavor-1';

  expect(flavor.resultFunc(selectedflavors, slug)).toEqual(selectedflavor);
});

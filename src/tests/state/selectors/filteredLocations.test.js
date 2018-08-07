import unselectedLocations from 'tests/state/mocks/unselected/locations';
import selectedFilteredLocations from 'tests/state/mocks/selected/filteredLocations';
import locations from 'state/selectors/locations';
import filteredLocations from 'state/selectors/filteredLocations';

it('filteredLocations selector works as intended', () => {
  const selectedLocations = locations.resultFunc(unselectedLocations);
  const filters = [
    {
      key: 'state',
      value: 'NY'
    }
  ];

  expect(filteredLocations.resultFunc(selectedLocations, filters)).toEqual(
    selectedFilteredLocations
  );
});

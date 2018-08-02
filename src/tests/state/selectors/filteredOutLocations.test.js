import unselectedLocations from 'tests/state/mocks/unselected/locations';
import selectedFilteredOutLocations from 'tests/state/mocks/selected/filteredOutLocations';
import locations from 'state/selectors/locations';
import filteredOutLocations from 'state/selectors/filteredOutLocations';

it('filteredOutLocations selector works as intended', () => {
  const selectedLocations = locations.resultFunc(unselectedLocations);
  const filters = [
    {
      key: 'state',
      value: 'NY'
    }
  ];

  expect(filteredOutLocations.resultFunc(selectedLocations, filters)).toEqual(
    selectedFilteredOutLocations
  );
});

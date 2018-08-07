import unselectedLocations from 'tests/state/mocks/unselected/locations';
import selectedFilteredOutLocations from 'tests/state/mocks/selected/filteredOutLocations';
import locations from 'state/selectors/locations';
import filteredOutLocations from 'state/selectors/filteredOutLocations';
import filteredLocations from 'state/selectors/filteredLocations';

it('filteredOutLocations selector works as intended', () => {
  const selectedLocations = locations.resultFunc(unselectedLocations);
  const filters = [
    {
      key: 'state',
      value: 'NY'
    }
  ];
  const selectedFilteredLocations = filteredLocations.resultFunc(
    selectedLocations,
    filters
  );

  expect(
    filteredOutLocations.resultFunc(
      selectedLocations,
      selectedFilteredLocations
    )
  ).toEqual(selectedFilteredOutLocations);
});

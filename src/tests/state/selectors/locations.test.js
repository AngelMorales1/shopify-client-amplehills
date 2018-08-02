import unselectedLocations from 'tests/state/mocks/unselected/locations';
import selectedLocations from 'tests/state/mocks/selected/locations';
import locations from 'state/selectors/locations';

it('locations selector works as intended', () => {
  expect(locations.resultFunc(unselectedLocations)).toEqual(selectedLocations);
});

import unselectedLocationsByRegions from 'tests/state/mocks/unselected/locationsByRegions';
import selectedLocationsByRegions from 'tests/state/mocks/selected/locationsByRegions';
import locationsByRegions from 'state/selectors/locationsByRegions';

it('locations selector works as intended', () => {
  expect(locationsByRegions.resultFunc(unselectedLocationsByRegions)).toEqual(
    selectedLocationsByRegions
  );
});

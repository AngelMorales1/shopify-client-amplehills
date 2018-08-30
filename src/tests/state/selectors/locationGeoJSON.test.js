import unselectedLocations from 'tests/state/mocks/unselected/locations';
import selectedLocationGeoJSON from 'tests/state/mocks/selected/locationGeoJSON';
import locations from 'state/selectors/locations';
import locationGeoJSON from 'state/selectors/locationGeoJSON';

it('locationGeoJSON selector works as intended', () => {
  const selectedLocations = locations.resultFunc(unselectedLocations);

  expect(locationGeoJSON.resultFunc(selectedLocations)).toEqual(
    selectedLocationGeoJSON
  );
});

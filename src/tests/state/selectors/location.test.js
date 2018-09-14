import selectedlocation from 'tests/state/mocks/selected/location';
import selectedlocations from 'tests/state/mocks/selected/locations';
import locations from 'state/selectors/locations';
import location from 'state/selectors/location';

it('location selector works as intended', () => {
  const locationId = 'test-location';

  expect(location.resultFunc(selectedlocations, locationId)).toEqual(
    selectedlocation
  );
});

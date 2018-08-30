import alertIsActive from 'state/selectors/alertIsActive';
import selectedalertIsActive from 'tests/state/mocks/selected/alertIsActive';
import unselectedalertIsActive from 'tests/state/mocks/unselected/alertIsActive';
it('alertIsActive selector works as intended', () => {
  expect(alertIsActive.resultFunc(unselectedalertIsActive)).toEqual(
    selectedalertIsActive
  );
});

import unselectedPartyDeposit from 'tests/state/mocks/unselected/partyDeposit';
import selectedPartyDeposit from 'tests/state/mocks/selected/partyDeposit';
import partyDeposit from 'state/selectors/partyDeposit';

it('partyDeposit selector works as intended', () => {
  expect(partyDeposit.resultFunc(unselectedPartyDeposit)).toEqual(
    selectedPartyDeposit
  );
});

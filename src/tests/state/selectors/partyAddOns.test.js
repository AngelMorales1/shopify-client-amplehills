import unselectedPartyAddOns from 'tests/state/mocks/unselected/partyAddOns';
import selectedPartyAddOns from 'tests/state/mocks/selected/partyAddOns';
import partyAddOns from 'state/selectors/partyAddOns';

it('partyAddOns selector works as intended', () => {
  expect(partyAddOns.resultFunc(unselectedPartyAddOns)).toEqual(
    selectedPartyAddOns
  );
});

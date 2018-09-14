import selectedevents from 'tests/state/mocks/selected/events';
import unselectedevents from 'tests/state/mocks/unselected/events';
import events from 'state/selectors/events';

it('events selector works as intended', () => {
  expect(events.resultFunc(unselectedevents)).toEqual(selectedevents);
});

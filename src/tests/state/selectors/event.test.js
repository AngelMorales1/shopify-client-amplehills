import selectedevent from 'tests/state/mocks/selected/event';
import selectedevents from 'tests/state/mocks/selected/events';
import events from 'state/selectors/events';
import event from 'state/selectors/event';

it('event selector works as intended', () => {
  const eventId = 'test-event-1';

  expect(event.resultFunc(selectedevents, eventId)).toEqual(selectedevent);
});

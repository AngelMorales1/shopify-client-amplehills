import selectedevents from 'tests/state/mocks/selected/events';
import {
  shopifyProducts,
  contentProducts
} from 'tests/state/mocks/unselected/events';
import events from 'state/selectors/events';

it('events selector works as intended', () => {
  expect(events.resultFunc(shopifyProducts, contentProducts)).toEqual(
    selectedevents
  );
});

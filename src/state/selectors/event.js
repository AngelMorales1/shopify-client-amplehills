import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'eventPage.eventPageData.items', []),
  (state, props) => get(props, 'match.params.eventId', ''),
  (events, id) => events.find(event => get(event, 'sys.id', '') === id)
);

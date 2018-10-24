import { createSelector } from 'reselect';
import get from 'utils/get';
import events from 'state/selectors/events';

export default createSelector(
  state => Object.values(events(state)),
  (state, props) => get(props, 'match.params.eventHandle', ''),
  (events, eventHandle) => events[eventHandle]
);

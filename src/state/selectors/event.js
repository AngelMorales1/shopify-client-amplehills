import { createSelector } from 'reselect';
import get from 'utils/get';
import events from 'state/selectors/events';

export default createSelector(
  state => events(state),
  (state, props) => {
    console.log(props);
    return get(props, 'match.params.eventHandle', '');
  },
  (events, eventHandle) =>
    events.find(event => get(event, 'handle', '') === eventHandle)
);

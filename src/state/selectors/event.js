import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => events(state),
  (state, props) => get(props, 'match.params.eventHandle', ''),
  (events, eventHandle) =>
    events.find(event => get(event, 'handle', '') === eventHandle)
);

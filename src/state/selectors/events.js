import { createSelector } from 'reselect';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'events.events'),
  events => {
    const selectedEvents = get(events, 'items', []).map(event => {
      const fields = get(event, 'fields', {});
      const id = get(event, 'sys.id', '');
      const blockCardText = get(fields, 'blockCardText', '');
      const eventType = get(fields, 'eventType', '');
      const image = get(fields, 'image.fields.file.url', '');
      const locationTitle = get(fields, 'location.fields.title', '');
      const title = get(fields, 'title', '');
      const datesAndTimes = get(fields, 'datesAndTimes.fragments', []).map(
        fragment => {
          return fragment.reduce((accumulated, current) => {
            accumulated[current.key] = current.value;

            return accumulated;
          }, {});
        }
      );

      return {
        id,
        blockCardText,
        eventType,
        image,
        locationTitle,
        title,
        datesAndTimes
      };
    });

    return selectedEvents;
  }
);
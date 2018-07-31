import { createSelector } from 'reselect';
import { DaysInOrder } from 'constants/Days.js';
import get from 'utils/get';

export default createSelector(
  state => get(state, 'locations.locations'),
  locations => {
    const selectedLocations = get(locations, 'items', []).map(location => {
      const id = get(location, 'sys.id', '');
      const fields = get(location, 'fields', {});
      fields.image = get(fields, 'image.fields.file.url', '');
      fields.seasonalImage = get(fields, 'seasonalImage.fields.file.url', '');

      const hours = {};
      const nestedFields = Object.keys(fields).reduce(
        (accumulated, current) => {
          if (DaysInOrder.includes(current)) {
            hours[current] = fields[current];
          } else {
            accumulated[current] = fields[current];
          }
          return accumulated;
        },
        {}
      );
      nestedFields.hours = hours;

      return {
        id,
        ...nestedFields
      };
    });

    return selectedLocations;
  }
);

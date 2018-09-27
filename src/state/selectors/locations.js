import { createSelector } from 'reselect';
import { Days } from 'constants/Days.js';
import get from 'utils/get';
import recursivelyStringify from 'utils/recursivelyStringify';
import sortHours from 'utils/sortHours';
import moment from 'moment';

export default createSelector(
  state => get(state, 'locations.locations'),
  locations => {
    const selectedLocations = get(locations, 'items', []).map(location => {
      const id = get(location, 'sys.id', '');
      const fields = get(location, 'fields', {});
      const title = get(fields, 'title', '');
      const image = get(fields, 'image.fields.file.url', '');
      const seasonalImage = get(fields, 'seasonalImage.fields.file.url', '');
      const address1 = get(fields, 'address1', '');
      const address2 = get(fields, 'address2', '');
      const city = get(fields, 'city', '');
      const region = get(fields, 'region', '');
      const state = get(fields, 'state', '');
      const zip = get(fields, 'zip', '');
      const coordinates = get(fields, 'location', {});
      const phone = get(fields, 'phone', '');
      const seasonal = get(fields, 'seasonal', true);
      const delivery = get(fields, 'delivery', false);
      const orderDeliveryLink = get(fields, 'orderDeliveryLink', '');
      const closeLocationForTheSeason = get(
        fields,
        'closeLocationForTheSeason',
        false
      );

      const hours = Object.keys(fields).reduce((accumulated, current) => {
        if (Days.includes(current)) accumulated[current] = fields[current];
        return accumulated;
      }, {});
      const sortedHours = sortHours(hours);
      const currentOpenHours = moment()
        .format('dddd')
        .toLowerCase();

      const searchableFields = {
        title,
        address1,
        address2,
        city,
        region,
        state,
        zip,
        phone
      };

      const stringifiedSearchableFields = Object.values(searchableFields).map(
        recursivelyStringify
      );

      return {
        ...searchableFields,
        id,
        image,
        seasonalImage,
        coordinates,
        seasonal,
        hours,
        sortedHours,
        delivery,
        orderDeliveryLink,
        closeLocationForTheSeason,
        currentOpenHours,
        stringifiedSearchableFields
      };
    });

    return selectedLocations;
  }
);

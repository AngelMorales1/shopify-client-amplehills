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
      const contentBlocks = get(fields, 'contentBlocks', []);
      const slug = get(fields, 'slug', '');
      const partyAvailable = get(fields, 'partyAvailable', false);
      const defaultPartyTypes = [
        { uuid: '1', index: 0, partyType: 'Bike Party', link: '/bike-party' },
        {
          uuid: '2',
          index: 1,
          partyType: 'Scoop Tab Party',
          link: 'scoop-tab-party'
        }
      ];
      let partyTypes = Object.values(
        get(fields, 'partyTypes.simpleFragments', {})
      ).reduce((fragmentsArray, fragment) => {
        fragmentsArray.push(fragment);

        return fragmentsArray;
      }, []);
      if (!partyTypes.length) {
        partyTypes = defaultPartyTypes;
      }

      const defaultTimeSlots = [
        { uuid: '1', index: 0, endTime: '11am', startTime: '1pm' },
        { uuid: '2', index: 1, endTime: '4pm', startTime: '2pm' },
        { uuid: '3', index: 2, endTime: '7pm', startTime: '5pm' },
        { uuid: '4', index: 3, endTime: '10pm', startTime: '8pm' }
      ];
      let timeSlots = Object.values(
        get(fields, 'timeSlots.simpleFragments', {})
      ).reduce((fragmentsArray, fragment) => {
        fragmentsArray.push(fragment);

        return fragmentsArray;
      }, []);
      if (!timeSlots.length) {
        timeSlots = defaultTimeSlots;
      }
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
        partyAvailable,
        partyTypes,
        timeSlots,
        orderDeliveryLink,
        closeLocationForTheSeason,
        currentOpenHours,
        stringifiedSearchableFields,
        contentBlocks,
        slug
      };
    });

    return selectedLocations;
  }
);

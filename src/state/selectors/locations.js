import { createSelector } from 'reselect';
import { Days } from 'constants/Days.js';
import get from 'utils/get';
import fragmentsToArray from 'utils/fragmentsToArray';
import recursivelyStringify from 'utils/recursivelyStringify';
import sortHours from 'utils/sortHours';
import moment from 'moment';
import flavors from 'state/selectors/flavors';

export default createSelector(
  state => get(state, 'locations.locations'),
  state => flavors(state),
  (locations, selectedFlavors) => {
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
      const geopoint = {
        lat: get(fields, 'location.lat', 0),
        lng: get(fields, 'location.lon', 0)
      };
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
      const timekitProjectId = get(fields, 'timekitProjectId');
      const partyAvailable = get(fields, 'partyAvailable', false);
      const partyTypesFragments = get(fields, 'partyTypes.simpleFragments', {});
      const partyTypes = fragmentsToArray(partyTypesFragments);
      const timeSlotsFragments = get(fields, 'timeSlots.simpleFragments', {});
      const timeSlots = fragmentsToArray(timeSlotsFragments);
      const participantsLimit = get(fields, 'participantsLimit', 55);
      const participantsLimitText = get(fields, 'participantsLimitText', '');
      const text = get(fields, 'text', '');
      const cakes = get(fields, 'cakes', false);
      const cakesBucket = get(fields, 'cakeOrderingBucket', '');
      const hours = Object.keys(fields).reduce((accumulated, current) => {
        if (Days.includes(current)) accumulated[current] = fields[current];
        return accumulated;
      }, {});
      const sortedHours = sortHours(hours);
      const currentOpenHours = moment()
        .format('dddd')
        .toLowerCase();
      const isOpen = (function() {
        const hoursArr = hours[currentOpenHours].split('-');

        const now = moment();
        const open = moment(
          `${now.format('YYYY MM DD')} ${hoursArr[0]}`,
          'YYYY MM DD hha'
        );
        const close = moment(
          `${now.format('YYYY MM DD')} ${hoursArr[1]}`,
          'YYYY MM DD hha'
        );
        const isOpen = now.isBetween(open, close);

        return isOpen;
      })();
      const navRegionOrder = get(fields, 'navRegionOrder', 100);
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

      const cakePickupTimeSlotsFragments = get(
        fields,
        'cakePickupTimeSlots.simpleFragments',
        {}
      );
      const cakePickupTimeSlots = Object.keys(cakePickupTimeSlotsFragments)
        .length
        ? fragmentsToArray(cakePickupTimeSlotsFragments).reverse()
        : [];
      const stringifiedSearchableFields = Object.values(searchableFields).map(
        recursivelyStringify
      );

      const availableFlavors = get(selectedFlavors, 'flavors', []).filter(
        flavor => {
          const availableLocations = get(flavor, 'availableLocations', []);

          return availableLocations.some(location => {
            return get(location, 'sys.id') === id;
          });
        }
      );
      const seoTitle = get(fields, 'seoTitle', '');
      const seoDescription = get(fields, 'seoDescription', '');
      const seoImage = get(fields, 'seoImage.fields.file.url', '');

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
        timekitProjectId,
        partyAvailable,
        partyTypes,
        geopoint,
        timeSlots,
        orderDeliveryLink,
        closeLocationForTheSeason,
        currentOpenHours,
        stringifiedSearchableFields,
        contentBlocks,
        slug,
        availableFlavors,
        participantsLimit,
        participantsLimitText,
        text,
        cakes,
        cakesBucket,
        navRegionOrder,
        cakePickupTimeSlots,
        isOpen,
        seoTitle,
        seoDescription,
        seoImage
      };
    });

    return selectedLocations;
  }
);

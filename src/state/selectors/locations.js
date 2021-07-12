import { createSelector } from 'reselect';
import { Days } from 'constants/Days.js';
import get from 'utils/get';
import fragmentsToArray from 'utils/fragmentsToArray';
import recursivelyStringify from 'utils/recursivelyStringify';
import sortHours from 'utils/sortHours';
import moment from 'moment';
import flavors from 'state/selectors/flavors';

export default createSelector(
  state => get(state, 'locations.locations', []),
  state => flavors(state),
  (locations, selectedFlavors) => {
    const selectedLocations = locations.map(location => {
      const id = get(location, '_id', '');

      const title = get(location, 'name', '');
      const image = get(location, 'image', '');
      const seasonalImage = get(location, 'seasonalImage.fields.file.url', ''); // TO-DO remove
      const address1 = get(location, 'address1', '');
      const address2 = get(location, 'address2', '');
      const city = get(location, 'city', '');
      const region = get(location, 'region', '');
      const state = get(location, 'state', '');
      const zip = get(location, 'zip', '');
      const coordinates = {
        lat: get(location, 'latitude', ''),
        lon: get(location, 'longitude', '')
      };
      const geopoint = {
        lat: get(location, 'latitude', 0),
        lng: get(location, 'longitude', 0)
      };
      const phone = get(location, 'phone', '');
      const seasonal = get(location, 'seasonal', true);
      const delivery = get(location, 'delivery', false);
      const orderDeliveryLink = get(location, 'deliveryLink', '');
      const closeLocationForTheSeason = false; // TO-DO remove
      const contentBlocks = get(location, 'blocks', []);

      const slug = get(location, 'slug', '');
      // const timekitProjectId = get(location, 'timekitProjectId');
      // const partyAvailable = get(location, 'partyAvailable', false);
      // const partyTypesFragments = get(location, 'partyTypes.simpleFragments', {});
      // const partyTypes = fragmentsToArray(partyTypesFragments);
      // const timeSlotsFragments = get(location, 'timeSlots.simpleFragments', {});
      // const timeSlots = fragmentsToArray(timeSlotsFragments);
      // const participantsLimit = get(location, 'participantsLimit', 55);
      // const participantsLimitText = get(location, 'participantsLimitText', '');
      const description = get(location, 'description', '');
      // const cakes = get(location, 'cakes', false);
      // const cakesBucket = get(location, 'cakeOrderingBucket', '');
      const hours = Object.keys(get(location, 'hours', {})).reduce(
        (accumulated, current) => {
          if (Days.includes(current))
            accumulated[current] = get(location, `hours.${current}`, '');
          return accumulated;
        },
        {}
      );
      const sortedHours = sortHours(hours);
      const currentOpenHours = moment()
        .format('dddd')
        .toLowerCase();
      const isOpen = (function() {
        if (!hours[currentOpenHours]) return false;
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
      const navRegionOrder = get(location, 'navRegionOrder', 100); // TO-DO remove
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

      // const cakePickupTimeSlotsFragments = get(
      //   fields,
      //   'cakePickupTimeSlots.simpleFragments',
      //   {}
      // );
      // const cakePickupTimeSlots = Object.keys(cakePickupTimeSlotsFragments)
      //   .length
      //   ? fragmentsToArray(cakePickupTimeSlotsFragments).reverse()
      //   : [];

      const availableFlavors = selectedFlavors.flavors.filter(flavor => {
        const availableLocations = get(flavor, 'availableLocations', []);

        return availableLocations.some(location => {
          return get(location, 'sys.id') === id;
        });
      });
      const seoTitle = get(location, 'seoTitle', '');
      const seoDescription = get(location, 'seoDescription', '');
      const seoImage = get(location, 'seoImage.fields.file.url', '');

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
        // timekitProjectId,
        // partyAvailable,
        // partyTypes,
        geopoint,
        // timeSlots,
        orderDeliveryLink,
        closeLocationForTheSeason,
        currentOpenHours,
        stringifiedSearchableFields,
        contentBlocks,
        slug,
        availableFlavors,
        // participantsLimit,
        // participantsLimitText,
        description,
        // cakes,
        // cakesBucket,
        navRegionOrder,
        // cakePickupTimeSlots,
        isOpen,
        seoTitle,
        seoDescription,
        seoImage
      };
    });

    return selectedLocations;
  }
);

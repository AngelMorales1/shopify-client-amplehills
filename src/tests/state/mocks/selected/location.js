import moment from 'moment';

export default {
  id: '0001',
  timeSlots: [
    {
      endTime: '11am',
      index: 0,
      startTime: '1pm',
      uuid: '1'
    },
    {
      endTime: '4pm',
      index: 1,
      startTime: '2pm',
      uuid: '2'
    },
    {
      endTime: '7pm',
      index: 2,
      startTime: '5pm',
      uuid: '3'
    },
    {
      endTime: '10pm',
      index: 3,
      startTime: '8pm',
      uuid: '4'
    }
  ],
  title: 'Location 1',
  image: 'path-to-image.jpg',
  seasonalImage: 'path-to-image.jpg',
  slug: 'test-location',
  address1: '110 Bowery',
  address2: 'Fl. 4',
  city: 'New York',
  closeLocationForTheSeason: false,
  contentBlocks: [],
  region: 'Manhattan',
  state: 'NY',
  zip: '10013',
  coordinates: {
    lon: 80.123,
    lat: 40.789
  },
  partyAvailable: false,
  partyTypes: [
    {
      index: 0,
      link: '/bike-party',
      partyType: 'Bike Party',
      uuid: '1'
    },
    {
      index: 1,
      link: 'scoop-tab-party',
      partyType: 'Scoop Tab Party',
      uuid: '2'
    }
  ],
  partyAvailable: false,
  partyTypes: [
    {
      index: 0,
      link: '/bike-party',
      partyType: 'Bike Party',
      uuid: '1'
    },
    {
      index: 1,
      link: 'scoop-tab-party',
      partyType: 'Scoop Tab Party',
      uuid: '2'
    }
  ],
  orderDeliveryLink: '',
  phone: '8881234567',
  seasonal: false,
  delivery: false,
  hours: {
    sunday: 'Noon–12am',
    monday: 'Noon–11pm',
    tuesday: 'Noon–11pm',
    wednesday: 'Noon–11pm',
    thursday: 'Noon–11pm',
    friday: 'Noon–11pm',
    saturday: 'Noon–11pm'
  },
  sortedHours: [{ Sun: 'Noon–12am' }, { 'Mon–Sat': 'Noon–11pm' }],
  currentOpenHours: moment()
    .format('dddd')
    .toLowerCase(),
  stringifiedSearchableFields: [
    'Location 1',
    '110 Bowery',
    'Fl. 4',
    'New York',
    'Manhattan',
    'NY',
    '10013',
    '8881234567'
  ]
};

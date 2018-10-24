import moment from 'moment';

export default [
  {
    id: '0001',
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
    orderDeliveryLink: '',
    partyAvailable: false,
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
  },
  {
    id: '0002',

    title: 'Location 2',
    image: 'path-to-image.jpg',
    seasonalImage: 'path-to-image.jpg',
    slug: '',
    address1: '36 Westwood BLVD',
    address2: '',
    city: 'New Jersey',
    closeLocationForTheSeason: false,
    contentBlocks: [],
    region: 'New Jersey',
    state: 'NJ',
    zip: '07654',
    coordinates: {
      lon: 80.123,
      lat: 40.789
    },
    partyAvailable: false,
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
      'Location 2',
      '36 Westwood BLVD',
      '',
      'New Jersey',
      'New Jersey',
      'NJ',
      '07654',
      '8881234567'
    ]
  }
];

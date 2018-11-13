import moment from 'moment';

export default {
  id: '0001',
  title: 'Location 1',
  text: '',
  image: 'path-to-image.jpg',
  seasonalImage: 'path-to-image.jpg',
  slug: 'test-location',
  address1: '110 Bowery',
  address2: 'Fl. 4',
  availableFlavors: [],
  cakes: false,
  cakesBucket: '',
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
  partyTypes: [],
  timeSlots: [],
  partyAvailable: false,
  orderDeliveryLink: '',
  participantsLimit: 55,
  participantsLimitText: '',
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

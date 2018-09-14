export default {
  items: [
    {
      sys: {
        id: '0001'
      },
      fields: {
        title: 'Location 1',
        image: {
          fields: {
            file: {
              url: 'path-to-image.jpg'
            }
          }
        },
        seasonalImage: {
          fields: {
            file: {
              url: 'path-to-image.jpg'
            }
          }
        },
        slug: 'test-location',
        contentBlocks: [],
        address1: '110 Bowery',
        address2: 'Fl. 4',
        city: 'New York',
        region: 'Manhattan',
        state: 'NY',
        zip: '10013',
        location: {
          lon: 80.123,
          lat: 40.789
        },
        phone: '8881234567',
        seasonal: false,
        delivery: false,
        sunday: 'Noon–12am',
        monday: 'Noon–11pm',
        tuesday: 'Noon–11pm',
        wednesday: 'Noon–11pm',
        thursday: 'Noon–11pm',
        friday: 'Noon–11pm',
        saturday: 'Noon–11pm'
      }
    },
    {
      sys: {
        id: '0002'
      },
      fields: {
        title: 'Location 2',
        image: {
          fields: {
            file: {
              url: 'path-to-image.jpg'
            }
          }
        },
        seasonalImage: {
          fields: {
            file: {
              url: 'path-to-image.jpg'
            }
          }
        },
        address1: '36 Westwood BLVD',
        address2: '',
        city: 'New Jersey',
        region: 'New Jersey',
        state: 'NJ',
        zip: '07654',
        location: {
          lon: 80.123,
          lat: 40.789
        },
        phone: '8881234567',
        seasonal: false,
        delivery: false,
        sunday: 'Noon–12am',
        monday: 'Noon–11pm',
        tuesday: 'Noon–11pm',
        wednesday: 'Noon–11pm',
        thursday: 'Noon–11pm',
        friday: 'Noon–11pm',
        saturday: 'Noon–11pm'
      }
    }
  ]
};

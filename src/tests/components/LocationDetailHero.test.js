import React from 'react';
import { shallow } from 'enzyme';

import LocationDetailHero from 'components/LocationDetailHero';

it('renders without data', () => {
  const component = shallow(<LocationDetailHero />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <LocationDetailHero
      location={{
        id: 'foo',
        title: 'foo',
        image: 'foo',
        seasonalImage: 'foo',
        address1: 'foo',
        address2: 'foo',
        city: 'foo',
        region: 'foo',
        state: 'foo',
        zip: 'foo',
        coordinates: {
          lon: 0,
          lat: 0
        },
        phone: 'foo',
        seasonal: false,
        hours: {
          monday: 'foo',
          tuesday: 'foo',
          wednesday: 'foo',
          thursday: 'foo',
          friday: 'foo',
          saturday: 'foo',
          sunday: 'foo'
        },
        sortedHours: [{ foo: 'foo' }],
        delivery: false
      }}
      locationGeoJSON={{
        features: [
          {
            type: 'foo',
            geometry: {
              type: 'foo',
              coordinates: [0, 0]
            },
            properties: {
              title: 'foo',
              address1: 'foo',
              address2: 'foo',
              city: 'foo',
              region: 'foo',
              state: 'foo',
              zip: 'foo',
              phone: 'foo',
              id: 'foo',
              image: 'foo',
              seasonalImage: 'foo',
              coordinates: {
                lon: 0,
                lat: 0
              },
              seasonal: false,
              hours: {
                monday: 'foo',
                tuesday: 'foo',
                wednesday: 'foo',
                thursday: 'foo',
                friday: 'foo',
                saturday: 'foo',
                sunday: 'foo'
              },
              sortedHours: [{ foo: 'foo' }, { foo: 'foo' }],
              delivery: false,
              orderDeliveryLink: 'foo',
              currentOpenHours: 'foo',
              stringifiedSearchableFields: ['foo'],
              contentBlocks: [],
              slug: 'foo'
            }
          },
          {
            type: 'foo',
            geometry: {
              type: 'foo',
              coordinates: [0, 0]
            },
            properties: {
              title: 'foo',
              address1: 'foo',
              address2: '',
              city: 'foo',
              region: 'foo',
              state: 'foo',
              zip: 'foo',
              phone: 'foo',
              id: 'foo',
              image: 'foo',
              seasonalImage: 'foo',
              coordinates: {
                lon: 0,
                lat: 0
              },
              seasonal: true,
              hours: {
                monday: 'foo',
                tuesday: 'foo',
                wednesday: 'foo',
                thursday: 'foo',
                friday: 'foo',
                saturday: 'foo',
                sunday: 'foo'
              },
              sortedHours: [{ foo: 'foo' }, { foo: 'foo' }, { foo: 'foo' }],
              delivery: false,
              orderDeliveryLink: 'foo',
              currentOpenHours: 'foo',
              stringifiedSearchableFields: ['foo'],
              contentBlocks: [],
              slug: 'foo'
            }
          }
        ],
        type: 'foo'
      }}
      events={[
        {
          id: 'foo',
          blockCardText: 'foo',
          eventType: 'foo',
          image: 'foo',
          locationTitle: 'foo',
          title: 'foo',
          datesAndTimes: [
            {
              uuid: 'foo',
              Date: 'foo',
              Time: 'foo'
            }
          ]
        }
      ]}
      setRef={() => console.log('foo')}
    />
  );

  expect(component).toMatchSnapshot();
});

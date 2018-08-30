import React from 'react';
import { shallow } from 'enzyme';

import LocationsCards from 'components/LocationsCards';

jest.mock('react-scroll-to-component', () => ({
  get: jest.fn()
}));

it('renders without data', () => {
  const component = shallow(<LocationsCards />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <LocationsCards
      filteredLocations={[
        {
          address1: 'foo',
          address2: 'foo',
          city: 'foo',
          coordinates: {
            lon: 0,
            lat: 0
          },
          currentOpenHours: 'foo',
          delivery: false,
          hours: {
            monday: 'foo',
            tuesday: 'foo',
            wednesday: 'foo',
            thursday: 'foo',
            friday: 'foo',
            saturday: 'foo',
            sunday: 'foo'
          },
          id: 'foo',
          image: 'foo.jpg',
          orderDeliveryLink: '/foo',
          phone: 'foo',
          region: 'foo',
          seasonal: true,
          seasonalImage: 'foo.png',
          sortedHours: [{ Sun: 'foo' }, { 'Mon–Fri': 'foo' }, { Sat: 'foo' }],
          state: 'foo',
          stringifiedSearchableFields: ['foo'],
          title: 'foo',
          zip: 'foo'
        }
      ]}
      actions={{
        addLocationFilter: () => console.log('foo'),
        clearLocationFilters: () => console.log('foo'),
        clearLocationSelection: () => console.log('foo'),
        removeLocationFilter: () => console.log('foo'),
        selectLocation: () => console.log('foo'),
        updateSearchFilter: () => console.log('foo')
      }}
      locationFilters={[
        {
          key: 'foo',
          value: 'foo'
        }
      ]}
      searchFilter="foo"
      locationResultsLabel="foo"
      selectedLocation="foo"
    />
  );
  expect(component).toMatchSnapshot();
});

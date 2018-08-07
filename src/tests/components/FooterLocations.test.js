import React from 'react';
import { shallow } from 'enzyme';

import FooterLocations from 'components/Footer/FooterLocations';

it('renders without data', () => {
  const component = shallow(<FooterLocations />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <FooterLocations
      locations={[
        {
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
        }
      ]}
    />
  );

  expect(component).toMatchSnapshot();
});

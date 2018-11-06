import React from 'react';
import { shallow } from 'enzyme';

import LocationDropdown from 'components/LocationDropdown';

it('renders without data', () => {
  const component = shallow(<LocationDropdown />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <LocationDropdown
      alertIsActive={false}
      LocationDropdownIsOpen={false}
      openLocationDropdown={() => {}}
      closeLocationDropdown={() => {}}
      locationSortedByGroup={{
        brooklyn: {
          Brooklyn: [
            {
              fields: {
                address1: 'foo',
                availableFlavors: [],
                city: 'foo',
                contentBlocks: [],
                delivery: true,
                friday: 'foo-foo',
                image: { sys: { id: 'foo' }, fields: { file: { url: 'foo' } } },
                location: { lon: 0, lat: 0 },
                monday: 'foo-foo',
                orderDeliveryLink: 'foo',
                partyAvailable: true,
                partyTypes: {},
                phone: '123-456-789',
                region: 'foo',
                saturday: 'foo-foo',
                seasonal: false,
                seasonalImage: {
                  sys: { id: 'foo' },
                  fields: { file: { url: 'foo' } }
                },
                slug: 'foo',
                state: 'foo',
                sunday: 'foo-foo',
                thursday: 'foo-foo',
                timeSlots: {},
                title: 'foo',
                tuesday: 'foo-foo',
                wednesday: 'foo-foo',
                zip: 'foo'
              }
            }
          ]
        }
      }}
      locationDropdownImage="foo"
    />
  );

  expect(component).toMatchSnapshot();
});

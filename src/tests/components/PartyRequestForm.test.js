import React from 'react';
import { shallow } from 'enzyme';

import PartyRequestForm from 'components/PartyRequestForm';

it('renders without data', () => {
  const component = shallow(<PartyRequestForm />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <PartyRequestForm
      actions={{
        addLineItems: () => {},
        fetchPartyAddons: () => {}
      }}
      checkout={{
        completedAt: null,
        currencyCode: 'foo',
        id: 'foo',
        lineItems: [],
        note: null,
        subtotalPrice: '0.00',
        totalPrice: '0.00',
        webUrl: '/foo'
      }}
      partyAddons={{
        foo: {
          available: false,
          description: 'foo',
          handle: 'foo',
          id: 'foo',
          price: '0.00',
          title: 'foo',
          variants: []
        }
      }}
      partyAvailableLocations={{
        foo: {
          address1: 'foo',
          address2: 'foo',
          city: 'foo',
          closeLocationForTheSeason: false,
          contentBlocks: [],
          coordinates: { lon: 0, lat: 0 },
          currentOpenHours: 'foo',
          delivery: true,
          hours: {
            monday: '12pm–11pm',
            tuesday: '12pm–11pm',
            wednesday: '12pm–11pm',
            thursday: '12pm–11pm',
            friday: '12pm–12am'
          },
          id: 'foo',
          image: 'foo',
          orderDeliveryLink: 'foo',
          partyAvailable: true,
          partyTypes: [],
          phone: 'foo',
          region: 'foo',
          seasonal: false,
          seasonalImage: 'foo',
          slug: 'foo',
          sortedHours: [],
          state: 'foo',
          stringifiedSearchableFields: [],
          timeSlots: [
            {
              endTime: 'foo',
              index: 0,
              startTime: 'foo',
              uuid: 'foo'
            }
          ],
          title: 'foo',
          zip: 'foo'
        }
      }}
      partyDeposit={{
        available: false,
        description: 'foo',
        handle: 'foo',
        id: 'foo',
        price: '0.00',
        title: 'foo'
      }}
    />
  );

  expect(component).toMatchSnapshot();
});

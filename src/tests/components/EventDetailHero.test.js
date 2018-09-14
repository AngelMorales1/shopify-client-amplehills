import React from 'react';
import { shallow } from 'enzyme';

import EventDetailHero from 'components/EventDetailHero';

it('renders without data', () => {
  const component = shallow(<EventDetailHero />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <EventDetailHero
      event={{
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
      }}
      actions={{
        getEvents: () => console.log('foo')
      }}
    />
  );

  expect(component).toMatchSnapshot();
});

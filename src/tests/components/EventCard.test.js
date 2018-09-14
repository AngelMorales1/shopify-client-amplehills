import React from 'react';
import { shallow } from 'enzyme';

import EventCard from 'components/EventCard';

it('renders without data', () => {
  const component = shallow(<EventCard />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <EventCard
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
      active={false}
    />
  );

  expect(component).toMatchSnapshot();
});

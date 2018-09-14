import React from 'react';
import { shallow } from 'enzyme';

import EventsBlock from 'components/EventsBlock';

it('renders without data', () => {
  const component = shallow(<EventsBlock />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <EventsBlock
      z={0}
      block={{
        fields: {
          backgroudColor: 'foo',
          title: 'foo',
          drip: false,
          eventType: 'foo',
          text: 'foo',
          events: [],
          locationFilterButton: false
        }
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

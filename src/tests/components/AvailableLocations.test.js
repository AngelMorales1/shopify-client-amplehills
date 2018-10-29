import React from 'react';
import { shallow } from 'enzyme';

import AvailableLocations from 'components/AvailableLocations';

it('renders without data', () => {
  const component = shallow(<AvailableLocations />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <AvailableLocations
      flavor={{
        availableLocations: [],
        contentBlocks: [],
        id: 'foo',
        image: 'foo',
        label: 'foo',
        slug: 'foo',
        title: 'foo'
      }}
      block={{
        fields: {
          contentType: 'foo',
          drip: false,
          title: 'foo'
        },
        sys: {
          id: 'foo'
        }
      }}
    />
  );

  expect(component).toMatchSnapshot();
});

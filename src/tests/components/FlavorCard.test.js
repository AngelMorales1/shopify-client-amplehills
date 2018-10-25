import React from 'react';
import { shallow } from 'enzyme';

import FlavorCard from 'components/FlavorCard';

it('renders without data', () => {
  const component = shallow(<FlavorCard />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <FlavorCard
      flavors={{
        dietaryRestrictions: {},
        filters: {},
        id: '',
        image: '',
        label: '',
        title: ''
      }}
    />
  );

  expect(component).toMatchSnapshot();
});

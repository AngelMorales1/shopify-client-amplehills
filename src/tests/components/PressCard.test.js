import React from 'react';
import { shallow } from 'enzyme';

import PressCard from 'components/PressCard';

it('renders without data', () => {
  const component = shallow(<PressCard />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <PressCard
      pressCard={{
        logoImage: {
          data: ''
        },
        linkUrl: '',
        quote: '',
        title: ''
      }}
    />
  );

  expect(component).toMatchSnapshot();
});

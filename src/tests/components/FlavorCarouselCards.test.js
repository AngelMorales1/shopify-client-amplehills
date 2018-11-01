import React from 'react';
import { shallow } from 'enzyme';

import FlavorCarouselCards from 'components/FlavorCarouselCards';

it('renders without data', () => {
  const component = shallow(<FlavorCarouselCards />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(<FlavorCarouselCards flavorItems={[]} />);

  expect(component).toMatchSnapshot();
});

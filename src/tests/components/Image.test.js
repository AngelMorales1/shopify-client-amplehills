import React from 'react';
import { shallow } from 'enzyme';

import { Image } from 'components/base';

it('renders without data', () => {
  const component = shallow(<Image />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(<Image src="test" />);

  expect(component).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';

import BlockSwitch from 'components/BlockSwitch';
import contentful from './data/BlockSwitch.contentful.js';

it('renders without data', () => {
  const component = shallow(<BlockSwitch />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(<BlockSwitch data={contentful} />);

  expect(component).toMatchSnapshot();
});

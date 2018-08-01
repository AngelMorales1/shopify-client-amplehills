import React from 'react';
import { shallow } from 'enzyme';

import { Modal } from 'components/base';

it('renders without data', () => {
  const component = shallow(<Modal />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(<Modal className="foo" />);

  expect(component).toMatchSnapshot();
});

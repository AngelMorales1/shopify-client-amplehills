import React from 'react';
import { shallow } from 'enzyme';

import Nav from 'components/Nav';

it('renders without crashing', () => {
  const component = shallow(<Nav />);

  expect(component).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';

import Loader from 'components/Loader';

it('renders without data', () => {
  const component = shallow(<Loader />);

  expect(component).toMatchSnapshot();
});

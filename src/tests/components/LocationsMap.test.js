import React from 'react';
import { shallow } from 'enzyme';

import LocationsMap from 'components/LocationsMap';

it('renders without data', () => {
  const component = shallow(<LocationsMap />);

  expect(component).toMatchSnapshot();
});

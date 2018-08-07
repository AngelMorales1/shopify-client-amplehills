import React from 'react';
import { shallow } from 'enzyme';

import FooterNewsletter from 'components/FooterNewsletter';

it('renders without data', () => {
  const component = shallow(<FooterNewsletter />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(<FooterNewsletter pathname={'/foo'} />);

  expect(component).toMatchSnapshot();
});

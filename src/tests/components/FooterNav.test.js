import React from 'react';
import { shallow } from 'enzyme';

import FooterNav from 'components/FooterNav';

it('renders without data', () => {
  const component = shallow(<FooterNav />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const items = [
    {
      icon: {
        data: '',
        name: 'foo'
      },
      link: '/foo',
      text: 'Foo',
      uuid: '12345'
    }
  ];
  const component = shallow(<FooterNav pathname={'/foo'} items={items} />);

  expect(component).toMatchSnapshot();
});

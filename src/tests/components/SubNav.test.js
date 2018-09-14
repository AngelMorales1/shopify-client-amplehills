import React from 'react';
import { shallow } from 'enzyme';

import { SubNav } from 'components/base';

it('renders without data', () => {
  const component = shallow(<SubNav />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <SubNav menuList={[]} className="foo" onClick={() => console.log('foo')} />
  );

  expect(component).toMatchSnapshot();
});

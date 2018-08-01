import React from 'react';
import { shallow } from 'enzyme';

import { Dropdown } from 'components/base';

it('renders without data', () => {
  const component = shallow(<Dropdown />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <Dropdown
      name="foo"
      value="foo"
      options={[{ value: 'foo', label: 'foo' }]}
      label="foo"
      placeholder="foo"
      variant="small"
      className="foo"
    />
  );

  expect(component).toMatchSnapshot();
});

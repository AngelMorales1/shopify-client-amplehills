import React from 'react';
import { shallow } from 'enzyme';

import { TextField } from 'components/base';

it('renders without data', () => {
  const component = shallow(<TextField />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <TextField
      id="foo"
      className="foo"
      label="foo"
      name="foo"
      error={false}
      onBlur={() => console.log('foo')}
      onChange={() => console.log('foo')}
      pattern="foo"
      placeholder="foo"
      type="textarea"
      required={false}
      value="foo"
      variant="quantity-medium"
      color="madison-blue"
      fullWidth={true}
    />
  );

  expect(component).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';

import { Button } from 'components/base';

it('renders without data', () => {
  const component = shallow(<Button />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <Button
      label="Click Me"
      variant="primary"
      color="denim"
      className="foo"
      fullWidth
      onClick={() => console.log('foo')}
    />
  );

  expect(component).toMatchSnapshot();
});

it('renders with data and internal link', () => {
  const component = shallow(
    <Button
      label="Click Me"
      variant="primary"
      color="denim"
      className="foo"
      fullWidth
      to="/products"
      onClick={() => console.log('foo')}
    />
  );

  expect(component).toMatchSnapshot();
});

it('renders with data and external link', () => {
  const component = shallow(
    <Button
      label="Click Me"
      variant="primary"
      color="denim"
      className="foo"
      fullWidth
      to="https://google.com"
      onClick={() => console.log('foo')}
    />
  );

  expect(component).toMatchSnapshot();
});

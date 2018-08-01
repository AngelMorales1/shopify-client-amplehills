import React from 'react';
import { shallow } from 'enzyme';

import { QuantitySelector } from 'components/base';

it('renders without data', () => {
  const component = shallow(<QuantitySelector />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <QuantitySelector
      className="foo"
      quantity={1}
      onChange={() => console.log('foo')}
      allowZero={false}
      variant="small"
      color="seafoam"
    />
  );

  expect(component).toMatchSnapshot();
});

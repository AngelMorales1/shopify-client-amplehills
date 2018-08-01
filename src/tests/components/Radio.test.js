import React from 'react';
import { shallow } from 'enzyme';

import { Radio } from 'components/base';

it('renders without data', () => {
  const component = shallow(<Radio />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <Radio
      variant="primary"
      color="white"
      className="foo"
      label="foo"
      checked={false}
      onClick={() => console.log('foo')}
    />
  );

  expect(component).toMatchSnapshot();
});

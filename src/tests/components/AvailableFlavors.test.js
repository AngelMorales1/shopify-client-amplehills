import React from 'react';
import { shallow } from 'enzyme';

import AvailableFlavors from 'components/AvailableFlavors';

it('renders without data', () => {
  const component = shallow(<AvailableFlavors />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <AvailableFlavors
      drip={false}
      setRef={() => console.log('foo')}
      location={{
        sys: {
          id: 'foo'
        }
      }}
      block={{
        title: ''
      }}
      z={1}
    />
  );

  expect(component).toMatchSnapshot();
});

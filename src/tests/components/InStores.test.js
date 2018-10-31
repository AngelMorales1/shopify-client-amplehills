import React from 'react';
import { shallow } from 'enzyme';

import InStores from 'components/InStores';

it('renders without data', () => {
  const component = shallow(<InStores />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <InStores
      localRetailers={{
        foo: {
          address: 'foo',
          city: 'foo',
          filter: 'foo',
          index: 0,
          number: 'foo',
          state: 'foo',
          title: 'foo',
          uuid: 'foo',
          zip: 'foo'
        },
        bar: {
          address: 'bar',
          city: 'bar',
          filter: 'bar',
          index: 1,
          number: 'bar',
          state: 'bar',
          title: 'bar',
          uuid: 'bar',
          zip: 'bar'
        }
      }}
      text="foo"
    />
  );

  expect(component).toMatchSnapshot();
});

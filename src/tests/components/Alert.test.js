import React from 'react';
import { shallow } from 'enzyme';

import Alert from 'components/Alert';

it('renders without data', () => {
  const component = shallow(<Alert />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <Alert
      alert={{
        alertCopy: 'foo',
        linkCopy: 'foo',
        linkUrl: 'foo',
        title: 'foo'
      }}
    />
  );

  expect(component).toMatchSnapshot();
});

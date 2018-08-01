import React from 'react';
import { shallow } from 'enzyme';

import { FormFlash } from 'components/base';

it('renders without data', () => {
  const component = shallow(<FormFlash />);

  expect(component).toMatchSnapshot();
});

it('renders with success', () => {
  const component = shallow(
    <FormFlash className="foo" message="foo" success={true} />
  );

  expect(component).toMatchSnapshot();
});

it('renders with error', () => {
  const component = shallow(
    <FormFlash className="foo" message="foo" error={true} />
  );

  expect(component).toMatchSnapshot();
});

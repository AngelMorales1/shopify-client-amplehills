import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumbs from 'components/Breadcrumbs';

it('renders without data', () => {
  const component = shallow(<Breadcrumbs />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <Breadcrumbs
      className={'foo'}
      breadcrumbs={[{ label: 'Continue Shopping', to: '/products' }]}
    />
  );

  expect(component).toMatchSnapshot();
});

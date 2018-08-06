import React from 'react';
import { shallow } from 'enzyme';

import ErrorPage from 'components/ErrorPage';

it('renders without data', () => {
  const component = shallow(<ErrorPage />);

  expect(component).toMatchSnapshot();
});

it('renders with data', () => {
  const component = shallow(
    <ErrorPage>
      <p>foo</p>
    </ErrorPage>
  );

  expect(component).toMatchSnapshot();
});

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import { store } from 'store';
import Nav from 'components/Nav';

it('renders without crashing', () => {
  const component = shallow(
    <Provider store={store}>
      <Nav />
    </Provider>
  );

  expect(component).toMatchSnapshot();
});
